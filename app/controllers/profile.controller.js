'use strict';

var mongoose    = require('mongoose');
var bcrypt      = require('bcryptjs');
var User        = mongoose.model('User');
var Vitrine     = mongoose.model('Vitrine');
var Picture     = mongoose.model('Picture');


// Debug only
exports.getProfile = (req, res) => {
    User.findById(req.decodedToken._id, (err, user) => {
        if(err)
            res.send(err);
        res.json(user)
    });
};

exports.getSubscriptions = (req, res) => {
    var userID = req.decodedToken._id;

    Vitrine.find({subscribers: userID}, (err, vitrines) => {
        if(err)
                res.send(err);
        
        console.log("GET SUBSCRIPTIONS : %s", vitrines);
    
        res.json(vitrines);
    });
};