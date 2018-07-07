'use strict';

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

// export function that return middleware to check JWT
module.exports = function() {
    return (req, res, next) => {
        //get token from query
        const token = req.body.token || req.query.token || req.get('x-access-token');

        //if no token valid res no authorize
        if (!token) {
            const err = new Error('no token provided');
            err.status = 401;
            next(err);
            return;
        }
        //if token exist verify it
        jwt.verify(token, localConfig.jwt.secret, (err, decoded) => {
            if (err) {
                err.status = 401;
                next(err);
                return;
            }
            req.user_id = decoded.user_id;
            next();
        });
    }
}