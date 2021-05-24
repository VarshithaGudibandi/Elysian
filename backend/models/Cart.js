var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const cartSchema = Schema( 
    {
        item:
        {
            type: String,
            required: true,
        },
        sku:
        {
            type: String,
            required: true,
        },
        quantity:
        {
            type: String,
            required: true,
        },
        discount: 
        {
            type: Number,
            required: true,
        },
        amount:
        {
            type: Number,
            required: true,
        },
    },
)

module.exports = cartSchema;