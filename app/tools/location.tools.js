'use strict';

var mongoose    = require('mongoose');
var Vitrine     = mongoose.model('Vitrine');


//Approximate the distance between two longitude 1° appart depending on latitude
exports.longitudeDistance = (latitude, distance) => {

    return -1.23 * latitude + 111000;
};

// Get the vitrines close to a position
//Return a mongoose promise
exports.getVitrinesNear = (lat, long, distance) => {

    var deltaLatitude = distance / 111000;
    var deltaLongitude = distance / this.longitudeDistance(lat, distance);

    return Vitrine.find({
        latitude: {
            $gte: +lat - +deltaLatitude, 
            $lt: +lat + +deltaLatitude 
        }, 
        longitude: {
            $gte: +long - +deltaLongitude,
            $lt: +long + +deltaLongitude
        }
    });
}

// Convert degrees to radians
exports.radians = (degrees) => {
    return degrees *  Math.PI / 180;
}

// Check if the position is in the vitrine range
// Return a boolean
exports.isInRange = (lat, long, vitrine) => {

    var distance = 6371000 * 
        Math.acos( 
            Math.cos(this.radians(lat)) * 
            Math.cos(this.radians(vitrine.latitude)) * 
            Math.cos(this.radians(vitrine.longitude)-this.radians(long)) +
            Math.sin(this.radians(lat)) * 
            Math.sin(this.radians(vitrine.latitude))
        );

    return distance < vitrine.radius;
}