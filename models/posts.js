var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    date: {
    	type: Date
    },
    title: {
    	type: String,
    	trim: true
    },
    body: {
    	type: String,
    	trim: true
    }  
});

exports.Posts = mongoose.model('Posts', schema);