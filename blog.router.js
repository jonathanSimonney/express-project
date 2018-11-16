const express = require('express')
const blogRouter = express.Router()
const Article = require('./models/Article.model')

blogRouter.get('/', (req, res) => {
    Article.find().populate('author category').exec().then(articles => {
        res.render('index', { articles })
    }).catch(error => res.send(error.message))
})
blogRouter.get('/article/:id', (req, res) => res.render('article.pug'))

module.exports = blogRouter
