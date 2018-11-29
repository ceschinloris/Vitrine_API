'use strict';

module.exports = function(app) {

    var temp = require('./temp.controller');

    app.route('/populate')
        .get(temp.populate)
};