var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const prodSchema = Schema( 
    {
        name:
        {
            type: String,
            required: true,
        },
        price:
        {
            type: Number,
            required:true,
        },
        stock:
        {
            type: Number,
            required: true,
        },
        description:
        {
            type: String,
            required: true,
        },
        color:
        {
            type: [String],
            // required:true,
        },
        size:
        {
            type: String,
            // required: true,
        },
        category:
        {
            type: [String],
            required: true,
        },
        imgPath:
        {
            type: String,
            required: true,
        }
    },
)

module.exports = mongoose.model('products',prodSchema)