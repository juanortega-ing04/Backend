const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Registro
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    const usuarioExistente = await User.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const nuevoUsuario = new User({ nombre, correo, password, rol });
    await nuevoUsuario.save();

    const token = generarToken(nuevoUsuario);
    res.status(201).json({ usuario: nuevoUsuario, token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error });
  }
};

// Login
exports.loginUsuario = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const esValido = await usuario.compararPassword(password);
    if (!esValido) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = generarToken(usuario);
    res.status(200).json({ usuario, token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};
