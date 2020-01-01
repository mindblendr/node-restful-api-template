const express = require('express');
const app = express();
const config = require('./config'); 

require('./autoload').init();
app.use(require('./routes'));

var server = app.listen(config.server.port, config.server.host, function () {
    console.log('Listening to ' + server.address().address + ':' + server.address().port + '');    
});