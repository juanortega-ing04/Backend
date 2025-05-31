const express = require('express');
const router = express.Router();
const paisController = require('../controllers/PaisController');

router.get('/', paisController.obtenerPaises);
router.post('/', paisController.crearPais);
router.put('/:id', paisController.actualizarPais);
router.delete('/:id', paisController.eliminarPais);

module.exports = router;
