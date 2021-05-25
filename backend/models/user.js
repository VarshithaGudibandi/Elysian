var mongoose = require('mongoose');
var addressSchema = require('./Address');
var cartSchema = require('./Cart');
var Schema = mongoose.Schema;

const userSchema = new Schema( 
    {
        firstName:
        {
            type: String,
            required:true,
        },
        lastName:
        {
            type: String,
            required: true,
        },
        email:
        {
            type: String,
            required: true,
        },
        password:
        {
            type: String,
            required: true,
        },
        contact:
        {
            type: Number,
            required: true,
        },
        date:
        {
            type: Date,
            default: Date.now
        },
        address:
        {
            type: [addressSchema],
            // required: true,
        },
        wishlist: 
        {
            type: [String],
            // required: true,
            default: []
        },
    },
)

module.exports = mongoose.model('users',userSchema)