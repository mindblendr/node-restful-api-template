var path = require('path');
var fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser');     
const router = express.Router()

router.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
router.use(bodyParser.json());                                     // parse application/json
router.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// router.use(methodOverride());

var directoryPath = path.join(__dirname);

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    files.forEach(function (file) {
        file = file.replace('.js', '');
        router.use('/' + file, require('./' + file));
    });
});

module.exports = router