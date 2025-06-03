// models/Visita.js
const mongoose = require('mongoose');

const visitaSchema = new mongoose.Schema({
  sitio: { type: String, required: true }, // correo o id
  motivo: { type: String, required: true },
  referencia: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visita', visitaSchema, 'visitas');
