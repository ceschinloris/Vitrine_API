'use strict';

var express         = require('express');
var app             = express();
var jsonwebtoken    = require('jsonwebtoken');
var bcrypt          = require('bcryptjs');

// Login function
exports.getJsonWebToken = (req, res) => {

    var User = require('../models/user.model');

    if(!req.body.email) {
        console.log("email field error");
        return res.status(401).send({ 'success': false, 'message': 'A `email` is required'});
    } 
    else if(!req.body.password) {
        console.log("password field error");
        return res.status(401).send({ 'success': false, 'message': 'A `password` is required'});
    }

    User.findOne({'email': req.body.email}, (error, result) => {
        if(error || !result)
        {   
            console.log("could not find a user with this email");
            return res.status(401).send({ 'success': false, 'message': 'Error retrieving user'});
        }
    })
        .lean()
        .then((user) => {
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if(error || !result)
                    return res.status(401).send({ 'success': false, 'message': 'Invalid email and password'});
        
                var token = jsonwebtoken.sign(user, req.app.get('jwt-secret'), {});
                res.send({'success': true, 'token': token});
            });
        }); 
};

exports.sendOK = (req, res) => {
    res.status(200).send({'success': true});
};