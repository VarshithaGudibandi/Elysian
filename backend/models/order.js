var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const orderSchema = Schema( 
    {
        userID:
        {
            type: String,
            required: true,
        },
        paymentStatus:
        {
            type: String,
            required:true,
        },
        shippingStatus:
        {
            type: String,
            required: true,
        },
        amount:
        {
            type: Number,
            // required: true,
        },
        items:
        {
            type: Array,
            required: true,
        },
        shippingAddress:
        {
            type: [addressSchema],
            required: true,
        },
        billingAddress:
        {
            type: [addressSchema],
            required: true,
        },
        trackingID:
        {
            type: String,
            required: true,
        },
    },
)

const itemSchema = new Schema(
    {
        sku: {
            type: String,
            // required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        preTax: {
            type: Number,
            required: true,
        },
        postTax: {
            type: Number,
            required: true,
        },
    }
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

module.exports = mongoose.model('orders',ordersSchema)