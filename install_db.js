'use strict';

const fs = require('fs');
const path = require('path');
const conn = require('./lib/connectMongoose');

initDBColection('ads');

function getLocalAds(callback) {

  const filePath = path.join('./public/ads.json');

  fs.readFile(filePath, 'utf8',(err, data) => {
    if (err) {
      callback(err);
      return;
    }

    const parsedAds = JSON.parse(data);
    callback(null, parsedAds);
  });
}

async function initDBColection(collectionName) {

    try {
        // drop collection if exists
        try {
            console.log('Droping collection', collectionName);
            await conn.collection(collectionName).drop();
          } catch (err) {
            // Ignore the error message issued by Mongoose
            // if the collection doesn't exist;
            // not very elegant, but it's quick and it works... ;-)
            if (err.message !== 'ns not found') {
                console.log('Error droping ', collectionName, err);
                throw err;
            }
          }
        var documents = [];

        // pre load db from JSON
        getLocalAds(function (err, parsedAds) {
            if (err) {
                console.error('Error getting data from JSON: ', err);
                return;
            }
            console.log('Loading ParsedJSON data in DB: ', parsedAds);
            documents = parsedAds['ads'];
            conn.collection(collectionName).insertMany(documents);
        });

    } catch (err) {
        console.log('Error loading data in DB:', err);
    }
    
}