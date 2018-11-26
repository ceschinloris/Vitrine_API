'use strict';

var mongoose    = require('mongoose');
var fs          = require('fs');
var Picture     = mongoose.model('Picture');

exports.getAll = (req, res) => {
    Picture.find({}, (err, picture) => {
        if(err)
            res.send(err);
        res.json(picture);
    });
};

exports.insert = (req, res) => {
    var newPicture = new Picture(req.body);
    newPicture.path = req.file.filename;
    newPicture.author = req.decodedToken._id;
    newPicture.save((err, picture) => {
        if(err)
            res.send(err);
        res.json(picture);
    });
};

exports.getById = (req, res) => {
    Picture.findById(req.params.pictureId, (err, picture) => {
        if(err)
            res.send(err);
        res.json(picture);
    });
};

exports.deleteById = (req, res) => {

    //TODO: verify that the user is the author or the vitrine admin

    Picture.remove({_id: req.params.pictureId}, (err, picture) => {
        if(err)
            res.send(err);
        res.json({message: 'Picture successfully deleted'});
    });
    
};

exports.getDataById = (req, res) => {
    Picture.findById(req.params.pictureId, (err, picture) => {
        if(err)
            res.send(err);
    }).then((picture) => {

        var s = fs.createReadStream('pictures/'+picture.path);
        s.on('open', () => {
            res.set('Content-Type', 'image/jpeg');
            s.pipe(res);
        });
        
        s.on('error', () => {
            res.set('Content-Type', 'text/plain');
            res.status(404).end('Not found');
        });
    });
}

exports.getLikes = (req, res) => {
    res.status(404).send();
}; 

exports.likePicture = (req, res) => {
    res.status(404).send();
};