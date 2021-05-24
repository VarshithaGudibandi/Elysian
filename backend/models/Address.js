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

module.exports = addressSchema;