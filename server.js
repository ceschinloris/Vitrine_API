'use strict';

var express         = require('express');
var app             = express();
var port            = process.env.port || 3000;
var bodyParser      = require('body-parser');
var jsonWebToken    = require ('jsonwebtoken');
var bcrypt          = require('bcryptjs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("jwt-secret", "bNEPp6H70vPo01yGe5lptraU4N9v005y");

// Config database
const dbConfig = require('./app/config/mongodb.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to MongoDB.");
}).catch(err => {
    console.log("Error connecting to MongoDB.");
    process.exit;
});

// Models loading
var User    = require('./app/models/user.model');
var Vitrine = require('./app/models/vitrine.model');
var Picture = require('./app/models/picture.model');

// Routes
require('./app/routes/authenticate.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/vitrine.routes')(app);
require('./app/routes/picture.routes')(app);

require('./app/temp/temp.routes')(app);


// Creating server
app.listen(port, function () {  
    console.log('App listening on port %s', port);
});
