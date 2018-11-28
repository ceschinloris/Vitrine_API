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
    console.log ('Picture post delete');

    // Remove the file
    var picturePath = 'pictures/' + pic.path;
    
    fs.unlink(picturePath, (err) => {
        if(err)
            throw err;
        console.log('%s was deleted', picturePath);
    });
    
    // TODO: remove the picture from the user.liked list
    //User.find({liked: req.params.pictureId});
   
    
});


module.exports = mongoose.model('Picture', PictureSchema);
