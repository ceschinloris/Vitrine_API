'use strict';

var fs          = require('fs');
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var PictureSchema = new Schema({
    path:       String,
    time:       {type: Date, default: Date.now},
    author:     {type: Schema.Types.ObjectId, ref: 'User'},
    vitrine:    {type: Schema.Types.ObjectId, ref: 'Vitrine'},
    fans:       [{type: Schema.Types.ObjectId, ref: 'User'}]
});

function deleteFile(picture){
    fs.unlink('pictures/' + picture.path); 
}

PictureSchema.post('findOneAndDelete', (pic) => {
    deleteFile(pic);
});

PictureSchema.post('delete', (pic) => {
    deleteFile(pic);
});


module.exports = mongoose.model('Picture', PictureSchema);
