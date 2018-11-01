'use strict';

module.exports = function(app) {
    var users = require('./../controllers/user.controller');
    var auth = require('./../middlewares/authenticate.middleware')

    app.route('/users')
        .get(users.getAll)
        .post(users.insert);

    app.route('/users/:userId')
        .get(users.getById)
        .delete(auth.validateToken, users.deleteById);

    app.route('/users/:userId/subscribe')
        .get(users.getVitrines);
    
    app.route('/users/:userId/subscribe/:vitrineId')
        .post(auth.validateToken, users.subscribeToVitrine);
};