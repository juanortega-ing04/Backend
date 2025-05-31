const Pais = require('../models/Pais');

exports.obtenerPaises = async (req, res) => {
  try {
    const paises = await Pais.find();
    res.json(paises);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener países' });
  }
};

exports.crearPais = async (req, res) => {
  try {
    const nuevoPais = new Pais(req.body);
    await nuevoPais.save();
    res.status(201).json(nuevoPais);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear país' });
  }
};

exports.actualizarPais = async (req, res) => {
  try {
    const paisActualizado = await Pais.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(paisActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar país' });
  }
};

exports.eliminarPais = async (req, res) => {
  try {
    await Pais.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'País eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar país' });
  }
};
