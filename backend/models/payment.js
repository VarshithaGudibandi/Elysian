var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const cardSchema = new Schema( 
    {
        userID:
        {
            type: String,
            required: true,
        },
        cardType:
        {
            type: String,
            required:true,
        },
        cardVerified:
        {
            type: Boolean,
            required: true,
        },
        cardDetails:
        {
            type: [detailsSchema],
            required: true,
        },
    },
)

const detailsSchema = new Schema(
    {
        type:
        {
            type: String,
            required: true,
        },
        lastFourDigits:
        {
            type: Number,
            required: true,
        },
        expMonth:
        {
            type: Number,
            required: true,
        },
        expYear:
        {
            type: Number,
            required: true,
        },
        cvvVerified:
        {
            type: Boolean,
            required: true,
        },
    }
)

module.exports = mongoose.model('payments',cardSchema)