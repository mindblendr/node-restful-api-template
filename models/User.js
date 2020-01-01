const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    session_id: String
}, { collection: 'user' });

module.exports = mongoose.model('User', userSchema);