const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/authControllers');

// POST /api/auth/registro
router.post('/registro', registrarUsuario);

// POST /api/auth/login
router.post('/login', loginUsuario);

module.exports = router;
