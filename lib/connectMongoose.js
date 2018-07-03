'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on('error', err => {
    console.log('Error de mongodb', err);
});

conn.once('open', () => {
    console.log('Conectando a MongoDB en ', conn.name);
});

mongoose.connect('mongodb://localhost/cursonode');

module.exports = conn;

