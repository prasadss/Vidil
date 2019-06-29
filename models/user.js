const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: Boolean
});
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.VIDSECRETKEY);
}
const User = mongoose.model('User', UserSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
    return Joi.validate(user, schema);
}
module.exports.User = User;
module.exports.validateUser = validateUser;