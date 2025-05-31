const express = require('express');
const router = express.Router();
const ciudadController = require('../controllers/ciudadController');

router.post('/', ciudadController.crearCiudad);
router.get('/', ciudadController.obtenerCiudades);
router.get('/:id', ciudadController.obtenerCiudadPorId);
router.put('/:id', ciudadController.actualizarCiudad);
router.delete('/:id', ciudadController.eliminarCiudad);

module.exports = router;
