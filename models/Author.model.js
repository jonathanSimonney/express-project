const shortid = require('shortid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const authorSchema = new Schema({
    _id: {
        'type': String,
        'default': shortid.generate
    },
    name: {
        'type': String,
        'required': true
    },
});