'use strict';

const mongoose = require('mongoose');

// primero definimos un esquema
const adSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    image: String, 
    tags:{
        type: String,
        enum: ["work", "lifestyle", "motor", "mobile"]
    }
}); 

const apiHiddenFields = ' -_id';

adSchema.statics.list = function(filter, skip, limit, fields, sort) {
    const query = Ad.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields + apiHiddenFields);
    query.sort(sort);

    return query.exec();
}

adSchema.index({ name: 1, sale: 1, price: 1, tags: 1});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;

