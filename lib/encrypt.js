

const crypto = require('crypto');


module.exports = {
  hashText(text) {
    return crypto.createHash('sha256').update(text).digest('base64');
  },

};
