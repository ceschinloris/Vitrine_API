'use strict';

var User        = require('./user.model');
var Vitrine     = require('./vitrine.model');

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var PictureSchema = new Schema({
    path:       String,
    time:       {type: Date, default: Date.now},
    author:     {type: Schema.Types.ObjectId, ref: 'User'},
    vitrine:    {type: Schema.Types.ObjectId, ref: 'Vitrine'}
});

module.exports = mongoose.model('Picture', PictureSchema);
