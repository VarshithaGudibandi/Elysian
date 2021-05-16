var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const userSchema = new Schema( 
    {
        _id:
        {
            type: String,
            required: true,
        },
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
        hashPass:
        {
            type: String,
            // required: true,
        },
        billingAddress:
        {
            type: [addressSchema],
            required: true,
        },
        shippingAddress:
        {
            type: [addressSchema],
            // required: true,
        },
    },
)

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

module.exports = mongoose.model('users',userSchema)