require('express-async-errors');
const winston = require('winston');
//require('winston-mongodb');

module.exports = function () {
    process.on('unhandledRejection', (ex) => {
        throw ex;
    })
    winston.exceptions.handle(
        [new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'unhandleExceptions.log', level: 'error' })]
    );
    winston.add(new winston.transports.File(
        { filename: 'logfile.log' }
    ));
    // winston.add(new winston.transports.MongoDB(
    //     {
    //         db: 'mongodb://localhost/TestDB'
    //     }
    // ));

}