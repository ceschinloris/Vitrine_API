'use strict';

var mongoose    = require('mongoose');
var bcrypt      = require('bcryptjs');
var Vitrine     = mongoose.model('Vitrine');

exports.getAll = (req, res) => {
    Vitrine.find({}, (err, vitrine) => {
        if(err)
            res.send(err);
        res.json(vitrine);
    });
};

exports.insert = (req, res) => {
    var newVitrine = new Vitrine(req.body);
    newVitrine.admin = req.decodedToken._id;
    
    newVitrine.save((err, vitrine) => {
        if(err)
            res.send(err);
        res.json(vitrine);
    });
};

exports.getById = (req, res) => {
    Vitrine.findById(req.params.vitrineId, (err, vitrine) => {
        if(err)
            res.send(err);
        res.json(vitrine);
    });
};

exports.deleteById = (req, res) => {

    //TODO: validate that the current user is the vitrine admin

    Vitrine.remove({_id: req.params.vitrineId}, (err, vitrine) => {
        if(err)
            res.send(err);
        res.json({message: 'Vitrine successfully deleted'});
    });
    
};