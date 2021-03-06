'use strict';

const crypto = require('crypto');


module.exports = {
    hashText: function(text) {
        return crypto.createHash('sha256').update(text).digest('base64');
    }

};