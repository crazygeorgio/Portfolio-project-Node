var mongoose = require('mongoose'),
	config = require('../libs/config');

mongoose.connect(config.get('mongoose:connection') + config.get('mongoose:name'), config.get('mongoose:options'));

module.exports = mongoose;