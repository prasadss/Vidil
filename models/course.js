const mongoose = require('mongoose');
const Joi = require('joi');
const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tag: {
        type: [String],
        validate: {
            validator: function (v) {
                return new Promise(function(resolve, reject){
                    setTimeout(() => {
                        resolve(v && v.length >= 1);
                    }, 4000);
                });
            },
            message: 'a course should have atleast one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        }
    }
})

module.exports = CourseSchema;