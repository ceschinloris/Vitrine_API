'use strict';

module.exports = function(app) {
    var users = require('./../controllers/user.controller');
    var auth = require('./../middlewares/authenticate.middleware')

    app.route('/users')
        .get(users.getAll) //DEBUG ONLY 
        .post(users.insert);

    app.route('/users/:userId')
        .get(users.getById)
        .put(auth.validateToken, users.putById)
        .delete(auth.validateToken, users.deleteById);

    app.route('/users/:userId/subscriptions')
        .get(users.getSubscriptions);

    app.route('/users/:userId/likes')
        .get(users.getLikes);
};