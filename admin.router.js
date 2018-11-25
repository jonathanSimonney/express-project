const express = require('express');
const adminRouter = express.Router();

//the models are needed in our route
const Category = require('./models/Category.model');
const Author = require('./models/Author.model');
const Article = require('./models/Article.model');

adminRouter.get('/', (req, res) => {
	Article.find().populate('author category').exec().then(articles => {
		res.render('admin/admin.pug', { articles })
	}).catch(error => res.send(error.message))
});
adminRouter.get('/write', (req, res) => {
	Promise
		.all([
			Author.find().sort('name'),
			Category.find().sort('title')
		])
		.then(([authors, categories]) => res.render('admin/write', { authors, categories }))
		.catch(error => res.send(error.message))
});

adminRouter.post('/write', (req, res) => {
	console.log(req.body);
	Article(req.body).save();
	res.send("article created (or not...)")
});

adminRouter.get('/edit/:id', (req, res) => {
	Promise
		.all([
			Author.find().sort('name'),
			Category.find().sort('title')
		])
		.then(([authors, categories]) => res.render('admin/edit', { authors, categories }))
		.catch(error => res.send(error.message))
});
adminRouter.get('/delete/:id', (req, res) => {
    //todo
});


module.exports = adminRouter;
