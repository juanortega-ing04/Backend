const mongoose = require('mongoose');
require('dotenv').config();

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'app_moviles'
    });
    console.log('🟢 Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

// Modelos temporales para actualizar
const Plato = mongoose.model(
  'Plato',
  new mongoose.Schema({ nombre: String, pais: String }, { strict: false }),
  'platos_tipicos'
);

const Pais = mongoose.model(
  'Pais',
  new mongoose.Schema({ nombre: String }, { strict: false }),
  'paises'
);

const actualizarPlatos = async () => {
  try {
    const platos = await Plato.find();

    for (const plato of platos) {
      const pais = await Pais.findOne({ nombre: plato.pais });

      if (pais) {
        plato.pais = pais._id; // Reemplaza el string por ObjectId
        await plato.save();
        console.log(`✅ Actualizado: ${plato.nombre}`);
      } else {
        console.warn(`⚠️ No se encontró país para: ${plato.nombre}`);
      }
    }

    console.log('✅ Todos los platos fueron actualizados');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error actualizando platos:', error);
  }
};

(async () => {
  await conectarDB();
  await actualizarPlatos();
})();
