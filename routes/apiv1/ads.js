'use strict';

const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');


/**
 * GET /
 * List of ads
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

    const ads = await Ad.list(filter, skip, limit, fields, sort);
    res.json({ success: true, result: ads });

    } catch(err) {
        next(err);
    }
});

/**
 * POST /
 * Add new ad
 */
 router.post('/', async (req, res, next) => {
    try {
        const ad = new Ad(req.body);

        const adSaved = await ad.save();
        
        res.json({ success: true, result: adSaved });

    } catch(err) {
        next(err);
    }
});

/**
 * PUT /
 * Update ad
 */
router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const data = req.body;

        const adUpdated = await Ad.findOneAndUpdate({ _id: _id }, data, { new: true }).exec() 

        res.json({ success: true, result: adUpdated });

    } catch(err) {
        next(err);
    }
});

module.exports = router;