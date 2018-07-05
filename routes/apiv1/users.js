'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../models/User');


/**
 * GET /
 * List of users
 */
router.get('/', async (req, res, next) => {
    try {
       
    const name = req.query.name; 
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};

    if (name) {
        filter.name = name;
    }

    const users = await User.list(filter, skip, limit, fields, sort);
    
    res.json({ success: true, result: users });

    } catch(err) {
        next(err);
    }
});

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