'use strict';

var express         = require('express');
var app             = express();
var jsonWebToken    = require('jsonWebToken');


exports.validateToken = (req, res, next) => {
    var authHeader = req.headers['authorization'];

    if(authHeader) {
        var bearerToken = authHeader.split(' ');
        if(bearerToken.length == 2) {
            jsonWebToken.verify(bearerToken[1], req.app.get('jwt-secret'), (err, decodedToken) => {
                if(err)
                {
                    console.log(err);
                    return res.status(401).send({'success': false, 'error': 'invalid authorization token'});
                }
                
                    req.decodedToken = decodedToken;
                    next();
            });
        }
    }
    else {
        res.status(401).send({'success': false, 'error': 'An authorization header is required'});
    }
};