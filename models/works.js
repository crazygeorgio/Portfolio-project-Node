var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
    	type: String,
    	trim: true,
    	required:true
    },
	tech: {
    	type: String,
    	trim: true
    },
    url: {
    	type: String,
    	trim: true
    },
    pic: {}
});

exports.Works = mongoose.model('Works', schema);