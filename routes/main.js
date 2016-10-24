var express = require('express');
var router = express.Router();

/* GET beauty url */
router.get('/:page.html?', function(req, res, next) {
	var page = (req.params.page == 'index' ? '' : req.params.page);
	res.redirect(301, '/' + page);
});

/* GET index page */
router.get('/', function(req, res, next) {
	res.render('pages/index', { pageTitle: 'Немного о себе' });
});

/* GET about page */
router.get('/about', function(req, res, next) {
    
    var Skills = require('../models/skills').Skills;

    Skills.find().sort('-_id').exec(function(err, skills){

		if(err) return next(err);

        res.render('pages/about', {
          pageTitle: 'Немного о себе',
          skills: skills
        });

    });

});

/* GET works page */
router.get('/works', function(req, res, next) {

    var Works = require('../models/works').Works;
    Works.find().exec(function(err, works){

        if(err) return next(err);

        res.render('pages/works', {
          pageTitle: 'Портфолио',
          works: works
        });

    });   
});

/* GET blog page */
router.get('/blog', function(req, res, next) {

    var Posts = require('../models/posts').Posts;
    var moment = require('moment');
    moment.locale('ru'); 
    Posts.find().sort('-_id').exec(function(err, posts){

		if(err) return next(err);

        res.render('pages/blog', {
          pageTitle: 'Бложек',
          posts: posts,
          moment: moment
        });

    });

});

/* GET admin page */
router.get('/admin', function(req, res, next) {

    var Posts = require('../models/posts').Posts;
    var Skills = require('../models/skills').Skills;
    var Works = require('../models/works').Works;
    var async = require('async');

	async.parallel({
	    posts: function(callback) {
	        Posts.find().sort('-_id').exec(function(err, posts){
	        	callback(null, posts);
	        });
	    },
	    skills: function(callback) {
	        Skills.find().exec(function(err, skills){
	        	callback(null, skills);
	        });
	    },
        works: function(callback) {
            Works.find().exec(function(err, works){
                callback(null, works);
            });
        },
	}, function(err, result) {

    	if(err) return next(err);

        res.render('pages/admin', {
          pageTitle: 'Админка',
          posts: result.posts,
          skills: result.skills,
          works: result.works
        });

	});

});

/* POST admin add post */
router.post('/admin/addPost', function(req, res, next) {

    var Posts = require('../models/posts').Posts,
    	isAjaxRequest = req.xhr,
    	newPost;

    req.body.date = new Date(req.body.date);
    if(req.body.date == 'Invalid Date') req.body.date = new Date();
    
    newPost = new Posts(req.body);

    newPost.save(function(err) {

    	if(isAjaxRequest) {
    		return err ? res.status(403).send('Ошибка при добавлении поста') : res.status(200).send('Статья добавлена');
    	} else {
    		res.redirect(301, '/admin?' + (err ? 'add=error' : 'add=ok'));
    	}

    });

});

/* GET admin delete post */
router.get('/admin/delPost', function(req, res, next) {

	var Posts = require('../models/posts').Posts,
		isAjaxRequest = req.xhr,
    	id = req.query.id;

	Posts.findById(id, function (err, post) {

		if(err) return next(err);
		
		if(!post) return res.redirect(301, '/admin');

		post.remove(function(err) {
			if(isAjaxRequest) {
				return err ? res.status(403).send('Ошибка при удалении поста') : res.status(200).send('Статья удалена');
			} else {
    			return res.redirect(301, '/admin?' + (err ? 'delete=error' : 'delete=ok'));
    		}
		});

	});

});

/* POST admin add skill */
router.post('/admin/addSkill', function(req, res, next) {

	var Skills = require('../models/skills').Skills,
		isAjaxRequest = req.xhr,
    	newSkill = new Skills(req.body);

    newSkill.save(function(err) {

    	if(isAjaxRequest) {
    		return err ? res.status(403).send('Ошибка при добавлении умения') : res.status(200).send('Умение добавлено');
    	} else {
    		res.redirect(301, '/admin?' + (err ? 'add=error' : 'add=ok'));
    	}

    });

});

/* POST admin add skill */
router.post('/admin/addSkill', function(req, res, next) {

    var Skills = require('../models/skills').Skills,
        isAjaxRequest = req.xhr,
        newSkill = new Skills(req.body);

    newSkill.save(function(err) {

        if(isAjaxRequest) {
            return err ? res.status(403).send('Ошибка при добавлении умения') : res.status(200).send('Умение добавлено');
        } else {
            res.redirect(301, '/admin?' + (err ? 'add=error' : 'add=ok'));
        }

    });

});

/* GET admin delete skill */
router.get('/admin/delSkill', function(req, res, next) {

    var Skills = require('../models/skills').Skills,
        isAjaxRequest = req.xhr,
        id = req.query.id;

    Skills.findById(id, function (err, skill) {

        if(err) return next(err);
        
        if(!skill) return res.redirect(301, '/admin');

        skill.remove(function(err) {
            if(isAjaxRequest) {
                return err ? res.status(403).send('Ошибка при удалении умения') : res.status(200).send('Умение удалено');
            } else {
                return res.redirect(301, '/admin?' + (err ? 'delete=error' : 'delete=ok'));
            }
        });

    });

});

/* POST admin update skills */
router.post('/admin/updateSkills', function(req, res, next) {

    var Skills = require('../models/skills').Skills,
        async = require('async'),
        isAjaxRequest = req.xhr,
        newSkillValues = req.body;

        if(!Object.keys(newSkillValues).length) return next(err);

        async.each(Object.keys(newSkillValues), function(index, callback) {

            var id = index.match(/\[(.*)\]/i)[1];
            Skills.update({_id: id}, {value: newSkillValues[index]}, callback);

        }, function(err) {

            if(isAjaxRequest) {
                return err ? res.status(403).send('Ошибка при изменении') : res.status(200).send('Изменения внесены');
            } else {
                res.redirect(301, '/admin?' + (err ? 'update=error' : 'update=ok'));
            }

        });

});

/* POST admin add work */
var upload = require('../libs/multer')('pic');

router.post('/admin/addWork', upload, function(req, res, next) {

    var Works = require('../models/works').Works,
        fs = require('fs'),
        isAjaxRequest = req.xhr,
        newWork,
        path,
        picUrl;

    if(req.body.url.length && !req.body.url.match(/^(http:\/\/|https:\/\/)/i)) {
        
        req.body.url = 'http://' + req.body.url;

    }

    if(!req.file) {
        if(isAjaxRequest) {
            return res.status(403).send('Ошибка при добавлении работы');
        } else {
            res.redirect(301, '/admin?add=error');
        }   
    }

    path = req.file.path;

    picUrl = '/' + req.file.path.split('\\').slice(1).join('/');

    req.body.pic = {
        url: picUrl,
        path: path
    };

    newWork = new Works(req.body);

    newWork.save(function(err) {

        if(err) fs.unlink(path);

        if(isAjaxRequest) {
            return err ? res.status(403).send('Ошибка при добавлении работы') : res.status(200).send('Работа добавлена');
        } else {
            res.redirect(301, '/admin?' + (err ? 'add=error' : 'add=ok'));
        }

    });

});

/* GET admin delete work  */
router.get('/admin/delWork', function(req, res, next) {

    var Works = require('../models/works').Works,
        fs = require('fs'),
        isAjaxRequest = req.xhr,
        id = req.query.id;

    Works.findById(id, function (err, work) {

        if(err) return next(err);
        
        if(!work) return res.redirect(301, '/admin');

        fs.unlink(work.pic.path);

        work.remove(function(err) {
            if(isAjaxRequest) {
                return err ? res.status(403).send('Ошибка при удалении работы') : res.status(200).send('Работа удалена');
            } else {
                return res.redirect(301, '/admin?' + (err ? 'delete=error' : 'delete=ok'));
            }
        });

    });

});

module.exports = router;
