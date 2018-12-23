'use strict';

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var Picture     = require('./picture.model');

var VitrineSchema = new Schema({
  name:       String,
  latitude:   Number,
  longitude:  Number,
  radius:     Number,
  admin:      {type: Schema.Types.ObjectId, ref: 'User'},
  subscribers: [{type: Schema.Types.ObjectId, ref: 'User'}]
});


VitrineSchema.post('findOneAndDelete', (vitrine) => {
  
  // remove the pictures in this vitrine
  console.log('Removing %s\'s pictures ...', vitrine.name);
  Picture.find({vitrine: vitrine._id}, (err, pictures) => {
      if(err)
        console.log(err);

      pictures.forEach(picture => {
        picture.delete((err) => {
          if(err)
            console.log(err);
        })
      });
  }); 
});




module.exports = mongoose.model('Vitrine', VitrineSchema);