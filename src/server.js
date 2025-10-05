import app from "./app.js";
import {sequelize} from "./config/db.js";
import "./models/index.js"; // Para sincronizar modelos

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida correctamente.");

    await sequelize.sync({ alter: false }); // No cambiar estructura
    console.log("🗃️ Modelos sincronizados con la base de datos.");

    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error.message);
  }
};

startServer();
