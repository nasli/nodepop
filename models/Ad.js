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

const apiExclusionID = ' -_id';

adSchema.statics.list = function(filter, skip, limit, fields, sort) {
    const query = Ad.find(filter);
    query.skip(skip);
    query.limit(limit);
    if (fields) {
        query.select(fields.replace(","," ") + apiExclusionID);

    } else {
        query.select(apiExclusionID);
    }
    query.sort(sort);

    return query.exec();
}

adSchema.index({ price: 1, sale: 1, name: 1, tags: 1});
adSchema.index({ name: 1 });
adSchema.index({ price: 1 });
adSchema.index({ sale: 1 });
adSchema.index({ tags: 1 });

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;


