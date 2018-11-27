const express = require('express');
const adminRouter = express.Router();

//the models are needed in our route
const Category = require('./models/Category.model');
const Author = require('./models/Author.model');
const Article = require('./models/Article.model');

var currentSession
adminRouter.get('/', (req, res) => {
	Article.find().populate('author category').exec().then(articles => {
		res.render('admin/admin.pug', { articles })
	}).catch(error => res.send(error.message))
});
adminRouter.get('/write', (req, res) => {
	currentSession = req.session
	let displayErrorMessage = currentSession.valid === false;
	req.session.valid = null;

	Promise
		.all([
			Author.find().sort('name'),
			Category.find().sort('title')
		])
		.then(([authors, categories]) => res.render('admin/write', { authors, categories, displayErrorMessage }))
		.catch(error => res.send(error.message))
});

adminRouter.post('/write', (req, res) => {
	currentSession = req.session
	Article(req.body).save().then(
		() => res.redirect(req.baseUrl + '/')
	).catch(
		(err) => {
			currentSession.valid = false;
			res.redirect(req.baseUrl + '/write')
		}
	);
});

adminRouter.get('/edit/:id', (req, res) => {
	currentSession = req.session
	let displayErrorMessage = currentSession.valid === false;
	req.session.valid = null;

	Promise
		.all([
			Author.find().sort('name'),
			Category.find().sort('title')
		])
		.then(([authors, categories]) => res.render('admin/edit', { authors, categories, displayErrorMessage }))
		.catch((err) => {
			currentSession.valid = false;
			res.redirect(req.baseUrl + '/')
		})
});
adminRouter.get('/delete/:id', (req, res) => {
    //todo
});


module.exports = adminRouter;
