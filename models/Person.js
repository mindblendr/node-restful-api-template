const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String
});

module.exports = mongoose.model('Person', personSchema);