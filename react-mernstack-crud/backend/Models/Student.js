'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    userId: {
        type: Number
    }
}, {
    collection: 'students'
})

module.exports = mongoose.model('Students', studentSchema)