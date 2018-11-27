'use strict';

var mongoose    = require('mongoose');
var bcrypt      = require('bcryptjs');
var Vitrine     = mongoose.model('Vitrine');
var User        = mongoose.model('User');



// -------------
// Create
// -------------
exports.insert = (req, res) => {
    var newVitrine = new Vitrine(req.body);
    newVitrine.admin = req.decodedToken._id;
    
    newVitrine.save((err, vitrine) => {
        if(err)
            res.send(err);
        res.json(vitrine);
    });
};

// -------------
// Read
// -------------
// Get all vitrines
exports.getAll = (req, res) => {
    Vitrine.find({}, (err, vitrine) => {
        if(err)
            res.send(err);
        res.json(vitrine);
    });
};

// Get a vitrine by Id
// Params: vitrineId
exports.getById = (req, res) => {
    Vitrine.findById(req.params.vitrineId, (err, vitrine) => {
        if(err)
            res.send(err);
        res.json(vitrine);
    });
};

// -------------
// Update
// -------------
exports.putById = (req, res) => {
    res.status(404).send();
};

// -------------
// Delete
// -------------
// Delete a vitrine
// Params: vitrineId
exports.deleteById = (req, res) => {
    Vitrine.findOneAndDelete({_id: req.params.vitrineId, admin: req.decodedToken._id}, (err, vitrine) => {
        if(err)
            res.send(err);

        if(!vitrine)
            res.json({message: 'No vitrine found with this id and author'});
        else
            res.json({message: 'Vitrine successfully deleted'});
    });

    // TODO: remove pictures from this vitrine
    
};

// -------------
// Subscription
// -------------
// get subscriber count
exports.getSubCount = (req, res) => {
    User.find({subscribed: req.params.vitrineId}).count((err, count) => {
        res.json(count);
    });
};

// subscribe an user to the vitrine
exports.subscribeById = (req, res) => {
    User.findById(req.decodedToken._id, (err, user) => {
        if(err)
            res.send(err);

        var index = user.subscribed.indexOf(req.params.vitrineId);
        if(index > -1)
            user.subscribed.splice(index, 1);
        else
            user.subscribed.push(req.params.vitrineId);

        user.save((err) => {
            if(err)
                res.send(err);

            res.status(200).send();
        });
    });
}; 

// -----------
// Position based functions
// -----------

// Get the 50 closest vitrines to the position
// Params: latitude / longitude
exports.getNearByPosition = (req, res) => {
    res.status(404).send();
};

// Get the vitrines containing the position 
// Params: latitude / longitude
exports.getByPosition = (req, res) => {
    res.status(404).send();
};

//------------
// Search
//------------
exports.search = (req, res) => {
    Vitrine.find
};