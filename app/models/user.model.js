'use strict';

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

//var Picture     = mongoose.model('Picture');
//var Vitrine     = mongoose.model('Vitrine');

var UserSchema = new Schema({
  username: String,
  password: String,
  email: String
});


UserSchema.post('findOneAndDelete', (user) => {
  
  console.log("Deleting user %s", user.username);

  // Remove user's subscriptions from vitrines
  Vitrine.find({subscribers: user._id}, (err, vitrines) => {
    if(err)
      console.log(err);
    
    vitrines.forEach(vitrine => {
      var index = vitrine.subscribers.indexOf(user._id);
      vitrine.subscribers.splice(index, 1);
      vitrine.save((err) => {
        if(err)
            console.log(err);
      }); 
    });      
  });

  // Remove user's likes from pictures
  Picture.find({fans: user._id}, (err, pictures) => {
    if(err)
      console.log(err);

    pictures.forEach(picture => {
      var index = pictures.fans.indexOf(user._id);
      picture.fans.splice(index, 1);
      picture.save((err) => {
        if(err)
            console.log(err);
      }); 
    });
  });

  // Remove the vitrines created by this user
  Vitrine.find({admin: user._id}, (err, vitrines) => {
    if(err)
      console.log(err);
    
    vitrines.forEach(vitrine => {
      vitrine.delete((err) => {
        if(err)
          console.log(err);
      });
    });
  });

  // Remove the pictures created by this user
  Picture.find({author: user._id}, (err, pictures) => {
    if(err)
      console.log(err);
    
    pictures.forEach(picture => {
      picture.delete((err) => {
        if(err)
          console.log(err);
      });
    })
  });
});

module.exports = mongoose.model('User', UserSchema);