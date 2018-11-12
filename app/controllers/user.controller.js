'use strict';

var mongoose    = require('mongoose');
var bcrypt      = require('bcryptjs');
var User        = mongoose.model('User');


// Debug only
exports.getAll = (req, res) => {
    User.find().populate('subscribed').exec((err, user) => {
        if(err)
            res.send(err);
        res.json(user)
    });
};

exports.insert = (req, res) => {
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password);
    newUser.save((err, user) => {
        if(err)
            res.send(err);
        res.json(user);
    });
};

exports.getById = (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if(err)
            res.send(err);
        res.json(user);
    });
};


exports.putById = (req, res) => {
    User.findByIdAndUpdate(req.params.userId)

    findByIdAndUpdate(
        // the id of the item to find
        req.params.todoId,
        
        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,
        
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        
        // the callback function
        (err, todo) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(todo);
        }
    )
}

exports.deleteById = (req, res) => {
    User.remove({_id: req.params.userId}, (err, user) => {
        if(err)
            res.send(err);
        res.json({message: 'User successfully deleted'});
    });
    
};

exports.getSubscriptions = (req, res) => {
    User.findById({_id: req.decodedToken._id}, 'subscribed').populate('subscribed').exec((err, vitrines) => {
        if(err)
            res.send(err);
        res.json(vitrines);
    });
};

exports.getLikes = (req, res) => {
    User.findById({_id: req.decodedToken._id}, 'liked').populate('liked').exec((err, pictures) => {
        if(err)
            res.send(err);
        res.json(pictures);
    });
};

/*
exports.subscribeToVitrine = (req, res) => {  

    User.findById(req.decodedToken._id, (err, user) => {
        if(err)
            res.send(err);
        else {
            console.log('user = ' + user);

            var arrayIndex = user.subscribed.indexOf(req.params.vitrineId);
            if(arrayIndex >= 0)
            {
                console.log('remove index ' + arrayIndex + 'from \n' + user.subscribed);
                user.subscribed.remove(req.params.vitrineId);
            }
            else
            {
                console.log('add index ' + req.params.vitrineId);
                user.subscribed.push(req.params.vitrineId);
            }

            user.save((err, user) => {
                if(err)
                    res.send(err);
                else {
                    console.log('user saved = ' + user);
                    res.json(user);
                }
            });
        }

    });

};
*/