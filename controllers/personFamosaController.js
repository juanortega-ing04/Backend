const Famoso = require('../models/PersonaFamosa');

exports.getFamosos = async (req, res) => {
  try {
    const famosos = await Famoso.find().populate('ciudad').populate('pais');
    res.json(famosos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener famosos', error });
  }
};

exports.getFamososPorPais = async (req, res) => {
  try {
    const { paisId } = req.params;
    const famosos = await Famoso.find({ pais: paisId }).populate('ciudad').populate('pais');
    res.json(famosos);
  } catch (error) {
    res.status(500).json({ message: 'Error al filtrar por país', error });
  }
};

exports.createFamoso = async (req, res) => {
  try {
    const nuevoFamoso = new Famoso(req.body);
    await nuevoFamoso.save();
    res.status(201).json(nuevoFamoso);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear famoso', error });
  }
};

exports.updateFamoso = async (req, res) => {
  try {
    const famoso = await Famoso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(famoso);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar famoso', error });
  }
};

exports.deleteFamoso = async (req, res) => {
  try {
    await Famoso.findByIdAndDelete(req.params.id);
    res.json({ message: 'Famoso eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar famoso', error });
  }
};
