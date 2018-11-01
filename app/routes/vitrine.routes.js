'use strict';

module.exports = function(app) {
    var vitrines = require('./../controllers/vitrine.controller');
    var auth = require('./../middlewares/authenticate.middleware')

    app.route('/vitrines')
        .get(vitrines.getAll)
        .post(auth.validateToken, vitrines.insert);

    app.route('/vitrines/:vitrineId')
        .get(vitrines.getById)
        .delete(auth.validateToken, vitrines.deleteById);
};