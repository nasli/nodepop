

const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const localConfig = require('../../localConfig');
const encryptUtils = require('../../lib/encrypt');

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

    user.pass = encryptUtils.hashText(user.pass);

    const userSaved = await user.save();

    res.json({ success: true, result: userSaved });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /
 * Authenticate
 */
router.post('/authenticate', async (req, res, next) => {
  try {
    const { email, pass } = req.body;
    const passEncrypted = encryptUtils.hashText(pass);

    const user = await User.findOne({ email }).exec();

    if (!user) {
      res.json({ success: true, message: 'Invalid credentials' });
      return;
    }


    if (passEncrypted !== user.pass) {
      res.json({ success: true, message: 'Invalid credentials' });
      return;
    }

    // create JWT
    jwt.sign({ user_id: user.id }, localConfig.jwt.secret, {
      expiresIn: localConfig.jwt.expiresIn,
    }, (err, token) => {
      if (err) {
        next(err);
        return;
      }
      res.json({ success: true, token });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
