const express = require('express')
const adminRouter = express.Router()
const Article = require('./models/Article.model')

adminRouter.get('/', (req, res) => {
	Article.find().populate('author category').exec().then(articles => {
		res.render('admin/admin.pug', { articles })
	}).catch(error => res.send(error.message))
})
adminRouter.get('/write', (req, res) => res.render('admin/write.pug'))
adminRouter.get('/edit/:id', (req, res) => res.render('admin/edit.pug'))
adminRouter.get('/delete/:id', (req, res) => {
    //todo
})


module.exports = adminRouter
