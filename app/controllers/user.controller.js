'use strict';

var mongoose    = require('mongoose');
var bcrypt      = require('bcryptjs');
var User        = mongoose.model('User');

exports.getAll = (req, res) => {
    User.find().populate('subscribed').exec((err, user) => {
        if(err)
            res.send(err);
        res.json(user)
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
    User.findById(req.params.userId, (err, user) => {
        if(err)
            res.send(err);
        res.json(user);
    });
};

exports.deleteById = (req, res) => {
    User.remove({_id: req.params.userId}, (err, user) => {
        if(err)
            res.send(err);
        res.json({message: 'User successfully deleted'});
    });
    
};

// Subscribe functions

exports.getVitrines = (req, res) => {
    User.findById({_id: req.decodedToken._id}, 'subscribed').populate('subscribed').exec((err, vitrines) => {
        if(err)
            res.send(err);
        res.json(vitrines);
    });
};

exports.subscribeToVitrine = (req, res) => {  

    User.findById(req.decodedToken._id, (err, user) => {
        if(err)
            res.send(err);
        else {
            console.log('user = ' + user);

            var arrayIndex = user.subscribed.indexOf(req.params.vitrineId);
            if(arrayIndex >= 0)
            {
                console.log('remove index ' + arrayIndex + 'from \n' + user.subscribed);
                user.subscribed.remove(req.params.vitrineId);
            }
            else
            {
                console.log('add index ' + req.params.vitrineId);
                user.subscribed.push(req.params.vitrineId);
            }

            user.save((err, user) => {
                if(err)
                    res.send(err);
                else {
                    console.log('user saved = ' + user);
                    res.json(user);
                }
            });
        }

    });

};