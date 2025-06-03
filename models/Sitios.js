const mongoose = require('mongoose');

const SitioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  ciudad: { type: String },
  pais: { type: String },
  foto: { type: String } // URL
});

module.exports = mongoose.model('Sitio', SitioSchema, 'sitios');
