'use strict';

module.exports = function(app) {
    var users = require('./../controllers/user.controller');
    var auth = require('./../middlewares/authenticate.middleware')

    app.route('/users')
        .get(users.getAll) //DEBUG ONLY 
        .post(users.insert);

    app.route('/users/:userId')
        .get(auth.validateToken, users.getById)
        .put(auth.validateToken, users.putById)
        .delete(auth.validateToken, users.deleteById);

    app.route('/users/:userId/vitrines')
        .get(auth.validateToken, users.getVitrines);
    
    app.route('/users/:userId/pictures')
        .get(auth.validateToken, users.getPictures);

    app.route('/users/:userId/subscriptions')
        .get(auth.validateToken, users.getSubscriptions);

    app.route('/users/:userId/likes')
        .get(users.getLikes);

    app.route('/users/:userID/news')
        .get(users.getNews);
};