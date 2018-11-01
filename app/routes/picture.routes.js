'use strict';

module.exports = function(app) {

    var multer = require('multer');
    var upload = multer({dest: 'pictures/'});
    var auth = require('./../middlewares/authenticate.middleware');
    var pictures = require('./../controllers/picture.controller');

    app.route('/pictures')
        .get(pictures.getAll)
        .post(auth.validateToken, upload.single('picture'), pictures.insert);

    app.route('/pictures/:pictureId')
        .get(pictures.getById)
        .delete(auth.validateToken, pictures.deleteById);

    app.route('/pictures/:pictureId/file')
        .get(pictures.getDataById);
};