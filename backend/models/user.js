var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const addressSchema = new Schema(
    {
        city:
        {
            type: String,
            required: true,
        },
        state:
        {
            type: String,
            required: true,
        },
        country:
        {
            type: String,
            required: true,
        },
        addLine1:
        {
            type: String,
            required: true,
        },
        addLine2:
        {
            type: String,
            required: true,
        },
        pinCode:
        {
            type: Number,
            required: true,
        },
    }
)

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
        billingAddress:
        {
            type: [addressSchema],
            // required: true,
        },
        shippingAddress:
        {
            type: [addressSchema],
            // required: true,
        },
    },
)

module.exports = mongoose.model('users',userSchema)