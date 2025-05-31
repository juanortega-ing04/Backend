// routes/visitasRoutes.js
const express = require('express');
const router = express.Router();
const Visita = require('../models/Visita');

router.post('/', async (req, res) => {
  try {
    const visita = new Visita(req.body);
    await visita.save();
    res.status(201).json(visita);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar la visita' });
  }
});

module.exports = router;
