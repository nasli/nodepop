

const mongoose = require('mongoose');

// Define model
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  pass: String,
});

const apiExclusionFields = ' -pass';
const apiExclusionID = ' -_id';

userSchema.statics.list = function (filter, skip, limit, fields, sort) {
  const query = User.find(filter);
  query.skip(skip);
  query.limit(limit);
  if (fields) {
    query.select(fields.replace(',', ' ') + apiExclusionID);
  } else {
    query.select(apiExclusionID + apiExclusionFields);
  }
  query.sort(sort);

  return query.exec();
};

userSchema.index({ name: 1 });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
