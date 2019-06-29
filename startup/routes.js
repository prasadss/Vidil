const express = require('express');
const genres = require('../routes/genreRoutes');
const customer = require('../routes/customerRoutes');
const user = require('../routes/userRoutes');
const home = require('../routes/homeRoutes')
const auth = require('../routes/authRoutes');
const error = require('../middleware/error')
const helmet = require('helmet');
const logger = require('../middleware/logger');

module.exports = function (app) {
    app.set('view engine', 'jade');
    app.set('views', './views');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('./public'));
    app.use(helmet());
    app.use(logger);
    app.use(express.json());
    app.use('/api/user/', user);
    app.use('/api/genres/', genres);
    app.use('/api/customer/', customer);
    app.use('/api/auth/', auth);
    app.use('/', home);
    app.use(error);
}