const { Router } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const router = Router();

// Ruta para autenticación
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Compara la contraseña hasheada
    const esValido = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValido) return res.status(400).json({ message: 'Contraseña incorrecta' });

    // Generamos un token JWT
    const token = jwt.sign({ id: usuario._id }, 'secreto', { expiresIn: '1h' });

    res.json({ message: 'Autenticación exitosa', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en la autenticación', error: error.message });
  }
});

module.exports = router;
