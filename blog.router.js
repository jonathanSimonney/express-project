const express = require('express')
const blogRouter = express.Router()
const Article = require('./models/Article.model')

//routing for article list
blogRouter.get('/', (req, res) => {
    Article.find().populate('author category').exec().then(articles => {
        res.render('index', { articles })
    }).catch(error => res.send(error.message))
})
//routing for single article
blogRouter.get('/article/:id', (req, res) => {
	Article.findById(req.params.id).populate('author category').exec().then(article => {
		if (article == null){//there isn't any article with given id, so we return a 404 error
			res.status(404)
			const resourceName = "article"
			const resourceId = "id " + req.params.id
			res.render('errors/404', {resourceName, resourceId})
		}else{
			res.render('article', { article })
		}
	}).catch(error => res.send(error.message))
})

module.exports = blogRouter
