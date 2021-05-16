const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    secret: 'yoursecret',
    database: `mongodb+srv://akshar:akshar2103@cluster0.70u0k.mongodb.net/elysian?retryWrites=true&w=majority`,
}