const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    session_id: String
}, { collection: 'user' });

userSchema.statics.login = function(username, password) {     
    return this.find({username, password});
}

module.exports = mongoose.model('User', userSchema);