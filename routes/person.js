const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Person = require('../models/Person');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.post('/login', function (req, res) {
    const config = require('../config');
    const jwt = require('jsonwebtoken');
    const moment = require('moment');

    var user = new User();
    user['username'] = req.body.username;
    user['password'] = req.body.password;
    User
        .login(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                var payload = {
                    auth_id: "5e0c10dfe8c59f1a288dd26e",
                    auth_session_id: "x",
                    auth_guard: "user",
                    iat: moment().unix(),
                    exp: moment().add(1, 'm').unix()
                }
            
                const token = jwt.sign(payload, config.jwt.secret);
                res.status(200).json({ token });
            } else {
                res.status(404).json({message: 'Invalid credentials!'});
            }
        })
        .catch(function (error) {
            res.status(500).json({ error });            
        });
});

router.get('/', authMiddleware, function (req, res) {
    Person
        .find()
        .then(function (people) {
            res.status(200).json(people);
        })
        .catch(function (error) {
            res.status(500).json({ error });
        });
});

router.get('/:person_id', function (req, res) {
    Person
        .findById(req.params.person_id)
        .exec()
        .then(function (person) {
            if (person) {
                res.status(200).json(person);
            } else {
                res.status(404).json({ message: 'No entry found' });
            }
        })
        .catch(function (error) {
            res.status(500).json({ error });
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
        .then(function (result) {
            res.status(200).json(result);
        })
        .catch(function (error) {
            res.status(500).json({ error });
        });
});

module.exports = router