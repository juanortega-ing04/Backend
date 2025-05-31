const express = require('express');
const router = express.Router();
const PlatoController = require('../controllers/platoTipicoController');

router.get('/', PlatoController.getPlatos);
router.get('/por-pais/:paisId', PlatoController.getPlatosPorPais);
router.get('/:id', PlatoController.getPlatoById);
router.post('/', PlatoController.createPlato);
router.put('/:id', PlatoController.updatePlato);
router.delete('/:id', PlatoController.deletePlato);

module.exports = router;
