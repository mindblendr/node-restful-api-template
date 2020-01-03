const mongoose = require('mongoose');

var personSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String
}, { collection: 'person' });

personSchema.statics.test = function() {
    return 'test';
}

module.exports = mongoose.model('Person', personSchema);