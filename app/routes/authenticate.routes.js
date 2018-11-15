'use strict';

module.exports = function(app) {

    var authenticate = require('../controllers/authenticate.controller')
    var auth = require('./../middlewares/authenticate.middleware')

    app.route('/login')
        .post(authenticate.getJsonWebToken);
    
    app.route('/validateToken')
        .get(auth.validateToken, authenticate.sendOK);
}