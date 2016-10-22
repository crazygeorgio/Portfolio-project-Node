var express = require('express');
var router = express.Router();

/* GET index page */
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
	res.render('pages/about', { pageTitle: 'Немного о себе' });
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

		//if(!posts) posts = null;

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
    Posts.find().sort('-_id').exec(function(err, posts){

    	//if(!posts) posts = null;

        res.render('pages/admin', {
          pageTitle: 'Админка',
          posts: posts
        });

    });

});

/* GET admin page add posts */
router.post('/admin/addPost', function(req, res, next) {

    var Posts = require('../models/posts').Posts,
    	isAjaxRequest = req.xhr,
    	newPost = new Posts(req.body);

    newPost.save(function(err) {
    	if(isAjaxRequest) {
    		return err ? res.status(403).send('Ошибка при добавлении поста') : res.status(200).send('Статья добавлена');
    	} else {
    		res.redirect(301, '/admin.html?' + (err ? 'add=error' : 'add=ok'));
    	}
    });

});

/* GET admin page add posts */
router.get('/admin/delPost', function(req, res, next) {

	var Posts = require('../models/posts').Posts,
		isAjaxRequest = req.xhr,
    	id = req.query.id;

	Posts.findById(id, function (err, post) {

		if(err) return next(err);
		
		if(!post) return res.redirect(301, '/admin.html');

		post.remove(function(err) {
			if(isAjaxRequest) {
				return err ? res.status(403).send('Ошибка при удалении поста') : res.status(200).send('Статья удалена');
			} else {
    			return res.redirect(301, '/admin.html?' + (err ? 'delete=error' : 'delete=ok'));
    		}
		});

	});

});

module.exports = router;
