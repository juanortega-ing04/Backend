const Visita = require('../models/Visita');

// Controlador para registrar una visita
exports.crearVisita = async (req, res) => {
  try {
    const visita = new Visita(req.body);
    await visita.save();
    res.status(201).json(visita);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar la visita' });
  }
};

// Controlador para obtener todas las visitas
exports.obtenerVisitas = async (req, res) => {
  try {
    const visitas = await Visita.find();
    res.status(200).json(visitas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las visitas' });
  }
};

