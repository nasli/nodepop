'use strict';

const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');

const jwtAuth = require('../../lib/jwtAuth');

/**
 * GET /
 * List of ads
 */
router.get('/', jwtAuth(), async (req, res, next) => {
    try {
       
    const tags = req.query.tags;

    const sale = req.query.sale;    
    const name = req.query.name;
    const price = req.query.price; 

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};

    if (tags) {
        const tagsArray = tags.split(",");
        console.log(tagsArray);
        filter.tags = tagsArray;
    }

    if (sale) {
        filter.sale = sale;
    }

    if (price) {
        const priceArrSplited = price.split('-');

        if (priceArrSplited.length === 1) {
            //equal price
            filter.price = priceArrSplited[0];
        } else {
            const minPrice = priceArrSplited[0];
            const maxPrice = priceArrSplited[1];

            if (minPrice === "") {
                filter.price = { '$lte' : maxPrice};
            } else if (maxPrice === "") {
                filter.price = { '$gte' : minPrice};
            } else {
                filter.price = { '$gte' : minPrice, '$lte' : maxPrice};
            }
        }
    }

    if (name) {
        filter.name = new RegExp('^' + name, "i");
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