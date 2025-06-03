const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Función para generar token
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

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol
      },
      token
    });
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
      return res.status(401).json({ mensaje: 'Correo no registrado' });
    }

    if (usuario.password !== password) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = generarToken(usuario);

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        rol: usuario.rol,
        correo: usuario.correo
      },
      token
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

