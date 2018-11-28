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

adminRouter.post('/edit/:id', (req, res) => {
	currentSession = req.session
	Article.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}).then(//validate against the schema.
		() => res.redirect(req.baseUrl + '/')
	).catch(
		(err) => {
			currentSession.valid = false;
			res.redirect(req.baseUrl + '/edit/' + req.params.id)
		}
	);
});

adminRouter.get('/edit/:id', (req, res) => {
	currentSession = req.session
	let displayErrorMessage = currentSession.valid === false;
	req.session.valid = null;

	Article.findById(req.params.id).populate('author category').exec().then(article => {
		if (article == null){//there isn't any article with given id, so we return a 404 error
			res.status(404)
			const resourceName = "article"
			const resourceId = "id " + req.params.id
			res.render('errors/404', {resourceName, resourceId})
		}else{
			Promise
				.all([
					Author.find().sort('name'),
					Category.find().sort('title')
				])
				.then(([authors, categories]) => res.render('admin/edit', { article, authors, categories, displayErrorMessage }))
				.catch((err) => {
					currentSession.valid = false;
					res.redirect(req.baseUrl + '/edit/' + req.params.id)
				})
		}
	}).catch(error => res.send(error.message))
});
adminRouter.get('/delete/:id', (req, res) => {
    //todo
});


module.exports = adminRouter;
