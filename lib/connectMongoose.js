'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on('error', err => {
    console.log('Error de mongodb', err);
});

conn.once('open', () => {
    console.log('Conectando a MongoDB en ', conn.name);
});

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
  databaseUri = 'mongodb://localhost:27017/cursonode';
}

mongoose.connect(databaseUri);

module.exports = conn;
