var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    value: { 
    	type: Number, 
    	min: 0, 
    	max: 100,
    	get: v => Math.round(v),
    	set: v => Math.round(v) 
    },
    category: {
        type: String,
        trim: true
    }
});

exports.Skills = mongoose.model('Skills', schema);