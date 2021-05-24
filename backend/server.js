const express = require('express')
const connectDB = require('./config/db')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()

const app = express()

require('./config/passport')(passport)

var controller = require('./app')

connectDB()

//view engine setup
app.set('view engine', 'ejs')
app.use(express.static('public'))

//body parser middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//express session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://akshar:akshar2103@cluster0.70u0k.mongodb.net/elysian?retryWrites=true&w=majority`
    }),
    cookie: { maxAge: 180*60*1000 }
  }))
app.use(passport.initialize());
app.use(passport.session());

//express flash middleware
app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
});

//pass login and session states to all views
app.use((req,res,next) => {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})

//set routes
var pages = require('./routes/pages')
var adminPages = require('./routes/admin_pages')
var products = require('./routes/products')
app.use('/admin/pages', adminPages)
app.use('/', pages)
app.use('/products', products)

controller(app)

const PORT = process.env.PORT || 5000

console.log(`Server running on port ${PORT}`)
app.listen(PORT)