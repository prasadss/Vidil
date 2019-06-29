const startDebugger = require('debug')('app:startup');
const DbDebugger = require('debug')('app:DB');
const morgan = require('morgan');

module.exports = function (app) {
    if (app.get('env') === "development") {
        app.use(morgan('tiny'));
        startDebugger('Morgan enabled...');
    }

}