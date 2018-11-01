'use strict';

var Vitrine = require('./vitrine.model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  subscribed: [{type: Schema.Types.ObjectId, ref: 'Vitrine'}]
});

module.exports = mongoose.model('User', UserSchema);
