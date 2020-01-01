const express = require('express');
const app = express();
const autoload = require('./autoload').init();
const mongoose = require('mongoose');
const config = require('./config'); 

app.use(require('./routes'));

var server = app.listen(config.server.port, config.server.host, function () {
    console.log('Listening to ' + server.address().address + ':' + server.address().port + '');    
});