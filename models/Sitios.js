const mongoose = require('mongoose');

const SitioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  ciudad: { type: mongoose.Schema.Types.ObjectId, ref: 'Ciudad', required: true },
  pais: { type: mongoose.Schema.Types.ObjectId, ref: 'Pais', required: true },
  foto: { type: String } // URL
});

module.exports = mongoose.model('Sitio', SitioSchema, 'sitios');
