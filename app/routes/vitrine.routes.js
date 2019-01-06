'use strict';

module.exports = function(app) {
    var vitrines = require('./../controllers/vitrine.controller');
    var auth = require('./../middlewares/authenticate.middleware')

    app.route('/vitrines')
        .get(vitrines.getAll)
        .post(auth.validateToken, vitrines.insert);

    app.route('/vitrines/:vitrineId')
        .get(vitrines.getById)
        .put(auth.validateToken, vitrines.putById)
        .delete(auth.validateToken, vitrines.deleteById);

    app.route('/vitrines/:vitrineId/pictures')
        .get(vitrines.getPictures);
    
    app.route('/vitrines/:vitrineId/subscribe')
        .get(vitrines.getSubCount)
        .post(auth.validateToken, vitrines.subscribeById);

    app.route('/vitrines/:latitude/:longitude')
        .get(vitrines.getByPosition);
    
    app.route('/vitrines/:latitude/:longitude/near')
        .get(vitrines.getNearByPosition);

    app.route('/vitrines/search/:query')
        .get(vitrines.search);
};