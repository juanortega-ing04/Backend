const Sitio = require('../models/Sitios');

const SitioController = {
  async getAll(req, res) {
    try {
      const sitios = await Sitio.find().populate('pais').populate('ciudad');
      res.json(sitios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener sitios turísticos' });
    }
  },

  async getById(req, res) {
    try {
      const sitio = await Sitio.findById(req.params.id).populate('pais').populate('ciudad');
      if (!sitio) return res.status(404).json({ error: 'Sitio no encontrado' });
      res.json(sitio);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el sitio turístico' });
    }
  },

  async create(req, res) {
    try {
      const nuevoSitio = new Sitio(req.body);
      const sitioGuardado = await nuevoSitio.save();
      res.status(201).json(sitioGuardado);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear el sitio turístico' });
    }
  },

  async update(req, res) {
    try {
      const sitioActualizado = await Sitio.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!sitioActualizado) return res.status(404).json({ error: 'Sitio no encontrado' });
      res.json(sitioActualizado);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar el sitio turístico' });
    }
  },

  async delete(req, res) {
    try {
      const sitioEliminado = await Sitio.findByIdAndDelete(req.params.id);
      if (!sitioEliminado) return res.status(404).json({ error: 'Sitio no encontrado' });
      res.json({ mensaje: 'Sitio eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el sitio turístico' });
    }
  }
};

module.exports = SitioController;
