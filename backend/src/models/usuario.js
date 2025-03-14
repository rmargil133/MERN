const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs'); // Importamos bcryptjs para el hash de la contraseña

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, min: 0, max: 120 },
  telefono: { type: Number, required: true },
  correo: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'El correo debe tener un formato válido'],
  },
  foto: { type: String }, // Campo para almacenar la ruta de la imagen
  contrasena: {
    type: String,
    required: true,
  }, // Nueva propiedad para la contraseña
}, {
  timestamps: true,
});

// Encriptar la contraseña antes de guardar al usuario
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) return next();

  const salt = await bcrypt.genSalt(10); // Generamos el salt para el hash
  this.contrasena = await bcrypt.hash(this.contrasena, salt); // Hasheamos la contraseña

  next();
});

module.exports = model('Usuario', usuarioSchema);
