const shortid = require('shortid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: {
        'type': String,
        'default': shortid.generate
    },
    title: {
        'type': String,
        'required': true
    },
});

module.exports = mongoose.model('Category', categorySchema);