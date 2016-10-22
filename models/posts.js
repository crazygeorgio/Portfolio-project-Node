var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    date: {
    	type: Date,
    	default: new Date()
    },
    title: String,
    body: String  
});

exports.Posts = mongoose.model('Posts', schema);