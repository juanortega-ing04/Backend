// models/Visita.js
const mongoose = require('mongoose');

const visitaSchema = new mongoose.Schema({
  usuario: { type: String, required: true }, // correo o id
  tipo: { type: String, enum: ['sitio', 'plato', 'ciudad', 'persona'], required: true },
  referencia: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visita', visitaSchema, 'visitas');
