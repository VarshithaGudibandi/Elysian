const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
var productsController = require('./app')
const app = express()

connectDB()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

productsController(app)

const PORT = process.env.PORT || 3000

console.log(`Server running on port ${PORT}`)
app.listen(PORT)