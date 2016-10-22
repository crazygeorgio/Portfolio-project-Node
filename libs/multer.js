module.exports = function(name) {
    
    var multer = require('multer'),
    	config = require('./config');

    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, config.get('uploads:dir'));
        },
        filename: function (req, file, callback) {
        	var ext = file.originalname.split('.').slice(-1);
            callback(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }
    });

    var fileFilter = function(req, file, cb) {

		var types = config.get('uploads:picTypes');

		if(types.indexOf(file.mimetype) + 1) {
			cb(null, true);
		} else {
			cb(null, false);
		}

	}

    return multer({ storage : storage, fileFilter : fileFilter}).single(name);	

};