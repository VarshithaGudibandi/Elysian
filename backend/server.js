const express = require('express')
const connectDB = require('./config/db')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
require('dotenv').config()

const app = express()

require('./config/passport')(passport)

var controller = require('./app')

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
});

controller(app)

const PORT = process.env.PORT || 3000

console.log(`Server running on port ${PORT}`)
app.listen(PORT)