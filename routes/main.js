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
	res.render('pages/works', { pageTitle: 'Портфолио' });
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
	}, function(err, result) {

    	if(err) return next(err);

        res.render('pages/admin', {
          pageTitle: 'Админка',
          posts: result.posts,
          skills: result.skills
        });

	});

});

/* POST admin add post */
router.post('/admin/addPost', function(req, res, next) {

    var Posts = require('../models/posts').Posts,
    	isAjaxRequest = req.xhr,
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

module.exports = router;
