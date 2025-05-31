const Plato = require('../models/PlatoTipico');

// Obtener todos los platos
exports.getPlatos = async (req, res) => {
  try {
    const platos = await Plato.find().populate('pais');
    res.json(platos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener platos', error });
  }
};

// Obtener platos por país (a través de ciudad)
exports.getPlatosPorPais = async (req, res) => {
  try {
    const { paisId } = req.params;
    const platos = await Plato.find()
      .populate({
        path: 'ciudadId',
        match: { paisId },
        populate: { path: 'paisId' }
      })
      .populate('sitioId');

    const platosFiltrados = platos.filter(plato => plato.ciudadId !== null);
    res.json(platosFiltrados);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener platos por país', error });
  }
};

// Crear nuevo plato
exports.createPlato = async (req, res) => {
  try {
    const nuevoPlato = new Plato(req.body);
    const saved = await nuevoPlato.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear plato', error });
  }
};

// Obtener plato por ID
exports.getPlatoById = async (req, res) => {
  try {
    const plato = await Plato.findById(req.params.id).populate('ciudadId sitioId');
    if (!plato) return res.status(404).json({ message: 'Plato no encontrado' });
    res.json(plato);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar plato', error });
  }
};

// Actualizar plato
exports.updatePlato = async (req, res) => {
  try {
    const updated = await Plato.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Plato no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar plato', error });
  }
};

// Eliminar plato
exports.deletePlato = async (req, res) => {
  try {
    const deleted = await Plato.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Plato no encontrado' });
    res.json({ message: 'Plato eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar plato', error });
  }
};
