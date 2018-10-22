const express = require('express')
const app = express()
const PORT = 3000
const HOST = 'localhost'

app.set('view engine', 'pug')
app.get('/', (req, res) => res.render('index'))
app.use(express.static('public'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
