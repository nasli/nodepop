'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const localConfig = require('../../localConfig');

// /**
//  * GET /
//  * List of users
//  */
// router.get('/', async (req, res, next) => {
//     try {
       
//     const name = req.query.name; 
//     const skip = parseInt(req.query.skip);
//     const limit = parseInt(req.query.limit);
//     const fields = req.query.fields;
//     const sort = req.query.sort;

//     const filter = {};

//     if (name) {
//         filter.name = name;
//     }

//     const users = await User.list(filter, skip, limit, fields, sort);
    
//     res.json({ success: true, result: users });

//     } catch(err) {
//         next(err);
//     }
// });

/**
 * POST /
 * Add new user
 */
 router.post('/', async (req, res, next) => {
    try {
        const user = new User(req.body);
          
        const userSaved = await user.save();

        res.json({ success: true, result: userSaved });

    } catch(err) {
        next(err);
    }
});

/**
 * POST /
 * Authenticate
 */
router.post('/authenticate', async (req, res, next) => {
    try {
        const email = req.body.email;
        const pass = req.body.pass;

        const user = await User.findOne({ email: email }).exec();
          
        if(!user) {
            res.json({ success: true, message: 'Invalid credentials' });
            return;
        }

        if (pass !== user.pass) {
            res.json({ success: true, message: 'Invalid credentials' });
            return;
        }

        //create JWT
        jwt.sign({ user_id: user._id }, localConfig.jwt.secret, {
            expiresIn: localConfig.jwt.expiresIn
        }, (err, token) => {
            if (err) {
                next(err);
                return;
            }
            res.json({ success: true, token: token });
        });

    } catch(err) {
        next(err);
    }
});

/**
 * PUT /
 * Update user
 */
router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const data = req.body;

        const userUpdated = await User.findOneAndUpdate({ _id: _id }, data, { new: true }).exec() 

        res.json({ success: true, result: userUpdated });

    } catch(err) {
        next(err);
    }
});

module.exports = router;