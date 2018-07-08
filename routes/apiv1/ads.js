

const express = require('express');

const router = express.Router();

const Ad = require('../../models/Ad');

const jwtAuth = require('../../lib/jwtAuth');

/**
 * GET /tags
 * List of available tags for the ads
 */
router.get('/tags', jwtAuth(), async (req, res, next) => {
  try {
    const tags = Ad.schema.path('tags').enumValues;
    console.log(tags);
    res.json({ success: true, result: tags });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /
 * List of ads
 */
router.get('/', jwtAuth(), async (req, res, next) => {
  try {
    const {
      tags, sale, name, price, fields, sort,
    } = req.query;
    const skip = parseInt(req.query.skip, 10);
    const limit = parseInt(req.query.limit, 10);


    const filter = {};

    if (tags) {
      const tagsArray = tags.split(',');
      filter.tags = tagsArray;
    }

    if (sale) {
      filter.sale = sale;
    }

    if (price) {
      const priceArrSplited = price.split('-');

      if (priceArrSplited.length === 1) {
        // equal price
        filter.price = priceArrSplited;
      } else {
        const minPrice = priceArrSplited[0];
        const maxPrice = priceArrSplited[1];

        if (minPrice === '') {
          filter.price = { $lte: maxPrice };
        } else if (maxPrice === '') {
          filter.price = { $gte: minPrice };
        } else {
          filter.price = { $gte: minPrice, $lte: maxPrice };
        }
      }
    }

    if (name) {
      filter.name = new RegExp(`^${name}`, 'i');
    }

    const ads = await Ad.list(filter, skip, limit, fields, sort);
    res.json({ success: true, result: ads });
  } catch (err) {
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
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /
 * Update ad
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const data = req.body;

    const adUpdated = await Ad.findOneAndUpdate({ id }, data, { new: true }).exec();

    res.json({ success: true, result: adUpdated });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
