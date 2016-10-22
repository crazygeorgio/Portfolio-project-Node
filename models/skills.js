var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: String,
    value: { 
    	type: Number, 
    	min: 0, 
    	max: 100,
    	get: v => Math.round(v),
    	set: v => Math.round(v) 
    },
    category: String
});

exports.Skills = mongoose.model('Skills', schema);