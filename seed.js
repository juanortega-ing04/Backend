require('dotenv').config();
const mongoose = require('mongoose');
const Ciudad = require('./models/Ciudad');

const ciudadesColombia = [
  'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena',
  'Cúcuta', 'Pereira', 'Bucaramanga', 'Manizales', 'Santa Marta'
];

const ciudadesVenezuela = [
  'Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Ciudad Guayana',
  'Barcelona', 'Maturín', 'Puerto La Cruz', 'Maracay', 'San Cristóbal'
];

async function insertarCiudades() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 Conectado a MongoDB');

    await Ciudad.deleteMany({});
    console.log('🧹 Ciudades anteriores eliminadas');

    const data = [
      ...ciudadesColombia.map(nombre => ({ nombre, pais: 'Colombia' })),
      ...ciudadesVenezuela.map(nombre => ({ nombre, pais: 'Venezuela' }))
    ];

    await Ciudad.insertMany(data);
    console.log('✅ Ciudades insertadas correctamente');
    process.exit();
  } catch (err) {
    console.error('❌ Error insertando ciudades:', err);
    process.exit(1);
  }
}

insertarCiudades();
