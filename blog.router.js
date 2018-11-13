const express = require('express')
const blogRouter = express.Router()

blogRouter.get('/', (req, res) => res.render('index'))
blogRouter.get('/article/:id', (req, res) => res.render('article.pug'))

module.exports = blogRouter
