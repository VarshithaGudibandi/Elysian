var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const cartSchema = Schema( 
    {
        userID:
        {
            type: String,
            required: true,
        },
        items:
        {
            type: Array,
            required: true,
        },
        amount:
        {
            type: Number,
            // required: true,
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

module.exports = mongoose.model('cart',cartSchema)