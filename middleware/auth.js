const config = require('../config');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const mongoose = require('mongoose');

const auth = function (req, res, next) {
    if (req.headers.authorization) {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt.secret, function (error, payload) {
            if (! error) {
                var query = null;
                const conditions = {
                    _id: payload.auth_id,
                    session_id: payload.auth_session_id
                };
    
                switch(payload.auth_guard) {
                    // case 'admin':
                    //     query = require('../models/Admin').where(conditions);
                    case 'user':
                        query = require('../models/User').where(conditions);
                }
    
                if (query) {
                    query
                        .then(function (users) {
                            if (users && users.length == 1) {
                                next();
                            } else {
                                res.status(401).json({ error: 'Unauthorized!' });
                            }
                        })
                        .catch(function (err) {
                            res.status(401).json({ error: 'Unauthorized!' });
                        })
                }
    
            } else {
                res.status(401).json({ error: 'Unauthorized!' });
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized!' });
    }
}

module.exports = [auth];