'use strict';

module.exports = function(app) {

    var authenticate = require('../controllers/authenticate.controller')

    app.route('/authenticate')
        .post(authenticate.getJsonWebToken);
}