'use strict';

var User        = require('./user.model');
var Vitrine     = require('./vitrine.model');
var fs          = require('fs');

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var PictureSchema = new Schema({
    path:       String,
    time:       {type: Date, default: Date.now},
    author:     {type: Schema.Types.ObjectId, ref: 'User'},
    vitrine:    {type: Schema.Types.ObjectId, ref: 'Vitrine'}
});


PictureSchema.post('findOneAndDelete', (pic) => {

    // Remove the file
    var picturePath = 'pictures/' + pic.path;
    
    fs.unlink(picturePath, (err) => {
        if(err)
            throw err;
        console.log('%s was deleted', picturePath);
    });
    
    // TODO: remove the picture from the user.liked list
    console.log("Removing user likes ...");
    User.find({liked: pic._id}, (err, users) => {
        console.log("Find after ")
        if(err)
            console.log(err);

        console.log(users);
        
        // works until here
        users.forEach(user => {
            console.log('%s liked this picture, not anymore', user.email);
            
            var index = user.liked.indexOf(pic._id);

            user.liked.splice(index, 1);
            user.save((err) => {
                if(err)
                    console.log(err);
            });
            
        });
        
    });
   
    
});


module.exports = mongoose.model('Picture', PictureSchema);
