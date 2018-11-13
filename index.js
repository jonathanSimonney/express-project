require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 3000
const HOST = 'localhost'
const mongoose = require('mongoose');

const adminRouter = require('./admin.router.js')
const blogRouter = require('./blog.router.js')

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use('/', blogRouter)
app.use('/admin', adminRouter)

const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const startApp = app => { // Création d'une fonction qui renvoie une promesse résolue (ou rejetée) en fonction du résultat du "app.listen" d'Express
    return new Promise( (resolve, reject) => {
        const server = app.listen(PORT, HOST, resolve)
        server.on('error', reject)
    } );
}

mongoose.connect( connectionString )
    .then(() => startApp(app))
    .catch(err => console.log(err))



