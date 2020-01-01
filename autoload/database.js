const db = require('../config').db;
const mongoose = require('mongoose');

mongoose
    // .connect('mongodb+srv://mindblendr:8k3102795q4a6J@node-rest-test-vreob.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    .connect(db.connection_string, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database.');
    });