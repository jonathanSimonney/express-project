const shortid = require('shortid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const articleSchema = new Schema({
    _id: {
        'type': String,
        'default': shortid.generate
    },
    title: {
        'type': String,
        'required': true
    },
    date: {
        'type': Date,
        'required': true,
        'default': Date.now()
    },
    content: {
        'type': String,
        'required': true
    },
    category: {
        'type': String,
        required : true,
        ref : 'Category'
    },
    author: {
        'type': String,
        required : true,
        ref : 'Author'
    },
});

//we need it because these models are included in the article
require('./Author.model')
require('./Category.model')

module.exports = mongoose.model('Article', articleSchema);
