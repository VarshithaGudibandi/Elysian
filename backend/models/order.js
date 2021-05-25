var mongoose = require('mongoose');
var addressSchema = require('./Address');
const User = require('./User');
var Schema = mongoose.Schema;

const orderSchema = Schema( 
    {
        email:
        {
            type: String,
            required: true,
        },
        cart:
        {
            type: Array,
            required: true,
        },
        totalAmount:
        {
            type: Number,
            required: true,
        },
        totalQty:
        {
            type: Number,
            required: true,
        },
        shippingStatus:
        {
            type: String,
            // required: true,
        },
        shippingAddress:
        {
            type: [addressSchema],
            // required: true,
        },
        billingAddress:
        {
            type: [addressSchema],
            // required: true,
        },
        paymentID:
        {
            type: String,
            // required: true,
        },
        fulfilled:
        {
            type: Boolean,
            default: false,
        },
        shipped:
        {
            type: Boolean,
            default: false,
        },
        delivered:
        {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('order', orderSchema);