var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    date: {
    	type: Date,
    	default: new Date()
    },
    title: String,
    body: String  
});

exports.Posts = mongoose.model('Posts', schema);