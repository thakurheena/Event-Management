"use strict"
var mongoose = require('mongoose');

var eventsSchema = mongoose.Schema({
    // title: String,
    description: String ,
    date: String ,
    time: String ,
    venue: String,   
    no_of_people_involved: Number
});

var Events = mongoose.model('Events', eventsSchema);

module.exports = Events;