'use strict';

var User        = require('./user.model');

var fs          = require('fs');
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var PictureSchema = new Schema({
    path:       String,
    time:       {type: Date, default: Date.now},
    author:     {type: Schema.Types.ObjectId, ref: 'User'},
    vitrine:    {type: Schema.Types.ObjectId, ref: 'Vitrine'}
});

function deleteOther(picture){
    // remove the vitrine from the user.subscribed list
    console.log('Removing user likes ...');
    User.find({liked: pic._id}, (err, users) => {
        console.log('Find after ')
        if(err)
            console.log(err);
        
        users.forEach(user => {            
            var index = user.liked.indexOf(pic._id);

            user.liked.splice(index, 1);
            user.save((err) => {
                if(err)
                    console.log(err);
            }); 
        }); 
    });   
}

PictureSchema.post('findOneAndDelete', (pic) => {
    deleteOther(pic);
});

PictureSchema.post('delete', (pic) => {
    deleteOther(pic);
});


module.exports = mongoose.model('Picture', PictureSchema);
