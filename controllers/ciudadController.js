const Ciudad = require('../models/Ciudad');

// Crear ciudad
exports.crearCiudad = async (req, res) => {
  try {
    const nuevaCiudad = new Ciudad(req.body);
    await nuevaCiudad.save();
    res.status(201).json(nuevaCiudad);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear ciudad', error });
  }
};

// Obtener todas las ciudades
exports.obtenerCiudades = async (req, res) => {
  try {
    const ciudades = await Ciudad.find().populate('paisId');
    res.status(200).json(ciudades);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ciudades', error });
  }
};

// Obtener ciudad por ID
exports.obtenerCiudadPorId = async (req, res) => {
  try {
    const ciudad = await Ciudad.findById(req.params.id).populate('paisId');
    if (!ciudad) return res.status(404).json({ mensaje: 'Ciudad no encontrada' });
    res.status(200).json(ciudad);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ciudad', error });
  }
};

// Actualizar ciudad
exports.actualizarCiudad = async (req, res) => {
  try {
    const ciudad = await Ciudad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ciudad) return res.status(404).json({ mensaje: 'Ciudad no encontrada' });
    res.status(200).json(ciudad);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar ciudad', error });
  }
};

// Eliminar ciudad
exports.eliminarCiudad = async (req, res) => {
  try {
    const ciudad = await Ciudad.findByIdAndDelete(req.params.id);
    if (!ciudad) return res.status(404).json({ mensaje: 'Ciudad no encontrada' });
    res.status(200).json({ mensaje: 'Ciudad eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar ciudad', error });
  }
};
