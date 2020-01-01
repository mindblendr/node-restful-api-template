const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Person = require('../models/Person');
const authMiddleware = require('../middleware/auth');

router.get('/new', (req, res) => {
    const config = require('../config');
    const jwt = require('jsonwebtoken');
    const moment = require('moment');
    var payload = {
        auth_id: "5e0c10dfe8c59f1a288dd26e",
        auth_session_id: "x",
        auth_guard: "user",
        iat: moment().unix(),
        exp: moment().add(1, 'm').unix()
    }

    const token = jwt.sign(payload, config.jwt.secret);
    res.status(200).json({token, duration: payload.exp - payload.iat});
})

router.get('/', authMiddleware, function (req, res) {
    Person
        .find()
        .then(people => {
            res.status(200).json(people);
        })
        .catch(error => {
            res.status(500).json({error});
        });
});

router.get('/:person_id', function (req, res) {  
    Person
        .findById(req.params.person_id)
        .exec()
        .then(person => {
            if (person) {
                res.status(200).json(person);
            } else {
                res.status(404).json({
                    message: 'No entry found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({error});
        });
});

router.post('/', function (req, res) {
    var person = new Person({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    
    person
        .save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({error});
        });
});

module.exports = router