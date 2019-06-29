const mongoose = require('mongoose');
const Joi = require('joi');
const GenreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}
module.exports.GenreSchema = GenreSchema;
module.exports.Genre = mongoose.model('Genre', GenreSchema);;
module.exports.validateUser = validateGenre;