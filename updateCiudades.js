const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://juandavortega:Proyectico2025@appmovilescluster.6vmbvlu.mongodb.net/?retryWrites=true&w=majority&appName=AppMovilesCluster";
const client = new MongoClient(uri);

async function corregirPaisEnCiudades() {
  try {
    await client.connect();
    const db = client.db("app_moviles");
    const ciudades = db.collection("ciudades");
    const paises = db.collection("paises");

    const documentos = await ciudades.find().toArray();

    for (const ciudad of documentos) {
      let paisNombre = ciudad.pais;
      let paisId = ciudad.paisId;

      // Si no tiene paisId, pero sí tiene "pais" (nombre)
      if (!paisId && paisNombre) {
        const pais = await paises.findOne({ nombre: paisNombre });
        if (pais) {
          await ciudades.updateOne(
            { _id: ciudad._id },
            {
              $set: { paisId: pais._id },
              $unset: { pais: "" }
            }
          );
          console.log(`✅ Actualizado ${ciudad.nombre} con paisId ${pais._id}`);
        } else {
          console.log(`⚠️ No se encontró país con nombre: ${paisNombre}`);
        }
      }
    }
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

corregirPaisEnCiudades();



