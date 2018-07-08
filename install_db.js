

const fs = require('fs');
const path = require('path');
const conn = require('./lib/connectMongoose');
const encryptUtils = require('./lib/encrypt');

function getLocalAds(callback) {
  const filePath = path.join('./public/ads.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
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
    // Ignore the error message issued by Mongoose if the collection doesn't exist
      if (err.message !== 'ns not found') {
        console.log('Error droping ', collectionName, err);
        throw err;
      }
    }

    let documents = [];

    // pre load db from JSON
    getLocalAds((err, parsedAds) => {
      if (err) {
        console.error('Error getting data from JSON: ', err);
        return;
      }
      console.log('Loading ParsedJSON data in DB: ', parsedAds);
      documents = parsedAds[collectionName];

      if (collectionName === 'users') {
        // const users =

        documents.forEach((user) => {
          const passEncrypted = encryptUtils.hashText(user.pass);
          const userEncryptedPass = user;
          userEncryptedPass.pass = passEncrypted;
          // users.push(userEncryptedPass);
        });
      }

      conn.collection(collectionName).insertMany(documents);
    });
  } catch (err) {
    console.log('Error loading data in DB:', err);
  }
}

initDBColection('ads');
initDBColection('users');
