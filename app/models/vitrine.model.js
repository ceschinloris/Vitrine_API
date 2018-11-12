'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VitrineSchema = new Schema({
  name:       String,
  latitude:   Number,
  longitude:  Number,
  radius:     Number,
  admin:      {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Vitrine', VitrineSchema);