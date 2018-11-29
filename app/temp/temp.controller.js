'use strict';

var mongoose = require('mongoose');
var bcrypt      = require('bcryptjs');
var fs          = require('fs');

var Picture     = mongoose.model('Picture');
var Vitrine     = mongoose.model('Vitrine');
var User        = mongoose.model('User');

// Repopulate database
exports.populate = (req, res) => {

    // Drop database
    mongoose.connection.dropDatabase();

    // Delete pictures files
    var path = 'pictures/';
    var files =  fs.readdirSync(path);
    files.forEach(file => {
        fs.unlinkSync(path + '/' + file);
    });


    // Create users
    var u1 = new User();
    u1.username = 'user1';
    u1.password = bcrypt.hashSync('user1');
    u1.email = 'user1@email.com';
    u1.save();

    var u2 = new User();
    u2.username = 'user2';
    u2.password = bcrypt.hashSync('user2');
    u2.email = 'user2@email.com';
    u2.save();

    var u3 = new User();
    u3.username = 'user3';
    u3.password = bcrypt.hashSync('user3');
    u3.email = 'user3@email.com';
    u3.save();


    // Create vitrines
    var v1 = new Vitrine();
    v1.name = 'vitrine1';
    v1.latitude = 46.9407007;
    v1.longitude = 6.6791412;
    v1.radius = 25;
    v1.admin = u1._id;
    v1.save();

    var v2 = new Vitrine();
    v2.name = 'vitrine2';
    v2.latitude = 47.9407007;
    v2.longitude = 7.6791412;
    v2.radius = 30;
    v2.admin = u2._id;
    v2.save();

    var v3 = new Vitrine();
    v3.name = 'vitrine3';
    v3.latitude = 48.9407007;
    v3.longitude = 8.6791412;
    v3.radius = 35;
    v3.admin = u3._id;
    v3.save();


    // Create pictures

    var original_file_path = 'app/temp/base_pic.jpg';
    var picturefolder = 'pictures/';
    var file1 = 'file1';
    var file2 = 'file2';
    var file3 = 'file3';
    var file4 = 'file4';

    fs.copyFileSync(original_file_path, picturefolder + file1);
    fs.copyFileSync(original_file_path, picturefolder + file2);
    fs.copyFileSync(original_file_path, picturefolder + file3);
    fs.copyFileSync(original_file_path, picturefolder + file4);

    var p1 = new Picture();
    p1.path = file1;
    p1.author = u1._id;
    p1.vitrine = v1._id;
    p1.save();

    var p2 = new Picture();
    p2.path = file2;
    p2.author = u2._id;
    p2.vitrine = v2._id;
    p2.save();

    var p3 = new Picture();
    p3.path = file3;
    p3.author = u3._id;
    p3.vitrine = v3._id;
    p3.save();

    var p4 = new Picture();
    p4.path = file4;
    p4.author = u3._id;
    p4.vitrine = v1._id;
    p4.save();

    
    res.send('database populated');
};
    