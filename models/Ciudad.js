const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const CiudadSchema = new Schema({
  nombre: String,
  bandera: String,
  ubicacion: {
    lat: Number,
    lng: Number
  },
  paisId: {
    type: Schema.Types.ObjectId,
    ref: 'Pais',
    required: true
  }
});

module.exports = mongoose.model('Ciudad', CiudadSchema, 'ciudades');

