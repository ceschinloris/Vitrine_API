'use strict';

module.exports = function(app) {
    var profile = require('./../controllers/profile.controller');
    var auth = require('./../middlewares/authenticate.middleware')

    app.route('/profile')
        .get(auth.validateToken, profile.getProfile);

    app.route('/profile/subscriptions')
        .get(auth.validateToken, profile.getSubscriptions)

};