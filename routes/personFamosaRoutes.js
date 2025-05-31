const express = require('express');
const router = express.Router();
const FamosoController = require('../controllers/personFamosaController');

router.get('/', FamosoController.getFamosos);
router.get('/por-pais/:paisId', FamosoController.getFamososPorPais);
router.post('/', FamosoController.createFamoso);
router.put('/:id', FamosoController.updateFamoso);
router.delete('/:id', FamosoController.deleteFamoso);

module.exports = router;
