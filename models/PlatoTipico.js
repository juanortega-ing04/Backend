const mongoose = require('mongoose');

const PlatoTipicoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: String },
  pais: { type: mongoose.Schema.Types.ObjectId, ref: 'Pais', required: true },
  sitio: { type: mongoose.Schema.Types.ObjectId, ref: 'Sitio', required: true }
});

module.exports = mongoose.model('PlatoTipico', PlatoTipicoSchema,'platos_tipicos');
