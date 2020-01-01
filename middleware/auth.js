const config = require('../config');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const mongoose = require('mongoose');

const auth = (req, res, next) => {
    jwt.verify(req.headers.authorization.split(' ')[1], config.jwt.secret, (error, payload) => {
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
                    .then(users => {
                        if (users && users.length == 1) {
                            next();
                        } else {
                            res.status(401).json({
                                error: 'Unauthorized!',
                                payload,
                                users
                            });
                        }
                    })
                    .catch(err => {
                        res.status(401).json({
                            error: 'Unauthorized: ' + err
                        });
                    })
            }

        } else {
            res.status(401).json({
                error: 'Unauthorized!'
            });
        }
    });
}

module.exports = [auth];