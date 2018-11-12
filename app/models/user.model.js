'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  subscribed: [{type: Schema.Types.ObjectId, ref: 'Vitrine'}],
  liked: [{type: Schema.Types.ObjectId, ref: 'Picture'}]
});

module.exports = mongoose.model('User', UserSchema);
