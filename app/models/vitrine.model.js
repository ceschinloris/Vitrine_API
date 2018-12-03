'use strict';
var Picture     = require('./picture.model');
var User        = require('./user.model');

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;


var VitrineSchema = new Schema({
  name:       String,
  latitude:   Number,
  longitude:  Number,
  radius:     Number,
  admin:      {type: Schema.Types.ObjectId, ref: 'User'}
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


  // remove user's subscription to this vitrine
  console.log('Removing subscriptions on %s', vitrine.name);
  User.find({subscribed: vitrine._id}, (err, users) => {
      if(err)
          console.log(err);
      
      users.forEach(user => {
          var index = user.subscribed.indexOf(vitrine._id);
          user.subscribed.splice(index, 1);

          user.save((err) => {
              if(err)
                  console.log(err);
          });
          
      });
      
  });
 
  
});




module.exports = mongoose.model('Vitrine', VitrineSchema);