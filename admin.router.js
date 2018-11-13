const express = require('express')
const adminRouter = express.Router()

adminRouter.get('/', (req, res) => res.render('admin/admin.pug'))
adminRouter.get('/write', (req, res) => res.render('admin/write.pug'))
adminRouter.get('/edit/:id', (req, res) => res.render('admin/edit.pug'))
adminRouter.get('/delete/:id', (req, res) => {
    //todo
})


module.exports = adminRouter
