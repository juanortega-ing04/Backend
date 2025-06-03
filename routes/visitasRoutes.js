const express = require('express');
const router = express.Router();
const visitasController = require('../controllers/visitasController');

router.post('/', visitasController.crearVisita);
router.get('/', visitasController.obtenerVisitas);

module.exports = router;

