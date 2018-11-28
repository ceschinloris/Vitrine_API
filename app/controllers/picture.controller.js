'use strict';

var mongoose    = require('mongoose');
var fs          = require('fs');
var Picture     = mongoose.model('Picture');
var User        = mongoose.model('User');

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
    newPicture.time = Date.now();
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

    Picture.findOneAndDelete({_id: req.params.pictureId, author: req.decodedToken._id}, (err) => {
        if(err){
            console.log('error : findoneanddelete');
            res.send(err);
        }
        
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
            res.status(404).send('Not found');
        });
    });
}

exports.getLikes = (req, res) => {
    
    User.find({liked: req.params.pictureId}).count((err, count) => {
        console.log("Number of likes: ", count );
        res.json(count);

    });
}; 

exports.likePicture = (req, res) => {
    
    User.findById(req.decodedToken._id, (err, user) => {
        if(err)
            res.send(err);


        var index = user.liked.indexOf(req.params.pictureId);
        if(index > -1)
            user.liked.splice(index, 1);
        else
            user.liked.push(req.params.pictureId);

        user.save((err) => {
            if(err)
                res.send(err);
            
            res.status(200).send();

        });
        
    });
};