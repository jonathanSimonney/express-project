const express = require('express')
const app = express()
const PORT = 3000
const HOST = 'localhost'

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))
app.get('/article/:id', (req, res) => res.render('article.pug'))
app.get('/admin', (req, res) => res.render('admin/admin.pug'))
app.get('/admin/write', (req, res) => res.render('admin/write.pug'))
app.get('/admin/edit/:id', (req, res) => res.render('admin/edit.pug'))
app.get('/admin/delete/:id', (req, res) => {
    //todo
})


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
