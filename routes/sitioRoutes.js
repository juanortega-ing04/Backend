const express = require('express');
const router = express.Router();
const SitioController = require('../controllers/sitioController');

router.get('/', SitioController.getAll);
router.get('/:id', SitioController.getById);
router.post('/', SitioController.create);
router.put('/:id', SitioController.update);
router.delete('/:id', SitioController.delete);

module.exports = router;
