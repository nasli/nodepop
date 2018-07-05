'use strict';

const mongoose = require('mongoose');

// primero definimos un esquema
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    pass: String 
}); 

const apiHiddenFields = ' -_id, -pass';

userSchema.statics.list = function(filter, skip, limit, fields, sort) {
    const query = User.find(filter);
    query.skip(skip);
    query.limit(limit);
    if (fields) {
        query.select(fields + apiHiddenFields);

    } else {
        query.select(apiHiddenFields);
    }
    query.sort(sort);

    return query.exec();
}

userSchema.index({ name: 1, email: 1});

const User = mongoose.model('User', userSchema);

module.exports = User;


