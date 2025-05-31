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

// Forzamos nombres reales de las colecciones
const Famoso = mongoose.model(
  'Famoso',
  new mongoose.Schema({ nombre: String, pais: String }, { strict: false }),
  'personas_famosas'
);

const Pais = mongoose.model(
  'Pais',
  new mongoose.Schema({ nombre: String }, { strict: false }),
  'paises'
);

const actualizarFamosos = async () => {
  try {
    const famosos = await Famoso.find();

    for (const famoso of famosos) {
      const pais = await Pais.findOne({ nombre: famoso.pais });

      if (pais) {
        famoso.pais = pais._id; // Reemplaza string por ObjectId
        await famoso.save();
        console.log(`✅ Actualizado: ${famoso.nombre}`);
      } else {
        console.warn(`⚠️ No se encontró país para: ${famoso.nombre}`);
      }
    }

    console.log('✅ Todos los famosos fueron actualizados');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error actualizando famosos:', error);
  }
};

(async () => {
  await conectarDB();
  await actualizarFamosos();
})();
