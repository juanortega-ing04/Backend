// models/Pais.js
const mongoose = require('mongoose');

const PaisSchema = new mongoose.Schema({
  nombre: String,
  bandera: String,
  ubicacion: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model('Pais', PaisSchema, 'paises');


