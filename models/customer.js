const mongoose = require('mongoose');
const Joi = require('joi');
const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    date: { type: Date, default: Date.now },
    isGold: {type:Boolean,default:false},
    phone: {
        type: Number,
        required:true
    }
})
function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        isGold:Joi.boolean(),
        phone:Joi.number().required()
    }
    return Joi.validate(customer, schema);
}
module.exports.CustomerSchema = CustomerSchema;
module.exports.validateCustomer = validateCustomer;