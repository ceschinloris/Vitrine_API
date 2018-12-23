'use strict';

var mongoose    = require('mongoose');
var bcrypt      = require('bcryptjs');
var User        = mongoose.model('User');
var Vitrine     = mongoose.model('Vitrine');
var Picture     = mongoose.model('Picture');


// Debug only
exports.getAll = (req, res) => {
    User.find((err, users) => {
        if(err)
            res.send(err);
        res.json(users)
    });
};

exports.insert = (req, res) => {
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password);
    newUser.save((err, user) => {
        if(err)
            res.send(err);
        res.json(user);
    });
};

exports.getById = (req, res) => {
    
    User.findById(req.params.userId, '-password', (err, user) => {
        if(err)
            res.send(err);
        res.json(user);
    })
};


exports.putById = (req, res) => {
    User.findByIdAndUpdate(req.decodedToken._id, req.body, {new: true}, (err, user) => {

        if (err) 
            return res.status(500).send(err);

        return res.json(user);
    });
}

exports.deleteById = (req, res) => {
    User.findOneAndDelete({_id: req.params.userId}, (err, user) => {
        if(err)
            res.send(err);
        res.json({message: 'User successfully deleted'});
    });
    
};


exports.getVitrines = (req, res) => {
    Vitrine.find({admin: req.decodedToken._id}, (err, vitrines) => {
        if(err)
            res.send(err);

        res.json(vitrines);
    });
};

exports.getPictures = (req, res) => {
    Picture.find({author: req.decodedToken._id}, (err, pictures) => {
        if(err)
            res.send(err);

        res.json(pictures);
    });
};

exports.getSubscriptions = (req, res) => {
    User.findById({_id: req.decodedToken._id}, 'subscribed', (err, vitrines) => {
        if(err)
            res.send(err);
        res.json(vitrines);
    });
};

exports.getLikes = (req, res) => {
    User.findById({_id: req.decodedToken._id}, 'liked', (err, pictures) => {
        if(err)
            res.send(err);
        res.json(pictures);
    });
};

exports.getNews = (req, res) => {

    res.status(404).send();
};