const db = require('../config').db;
const mongoose = require('mongoose');

mongoose
    .connect(db.connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function() {
        console.log('Connected to database.');
    });