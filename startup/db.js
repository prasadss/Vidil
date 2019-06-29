const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function () {
    mongoose.connect(
        config.get('MongoDB.url'),
        { useNewUrlParser: true })
        .then(() => winston.info(`connected to mongodb ${config.get('MongoDB.url')}`));
}