const mongoose = require('mongoose');

const PersonaFamosaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  actividad: { type: String, required: true }, // Ej: "Deportista", "Cantante"
  ciudad: { type: mongoose.Schema.Types.ObjectId, ref: 'Ciudad', required: true },
  pais: { type: mongoose.Schema.Types.ObjectId, ref: 'Pais', required: true },
  foto: { type: String } // URL opcional
});

module.exports = mongoose.model('PersonaFamosa', PersonaFamosaSchema, 'personas_famosas');
