import bcrypt from "bcrypt";
import User from "../models/User.js"; // Asegúrate de que la ruta sea correcta

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash("123", 10); // 10 es el salt rounds

    const [admin, created] = await User.findOrCreate({
      where: { username: "admin" },
      defaults: {
        password: hashedPassword,
        role: "admin",
      },
    });

    if (created) {
      console.log("✅ Usuario admin creado con éxito");
    } else {
      console.log("ℹ️ El usuario admin ya existe");
    }
  } catch (error) {
    console.error("❌ Error creando el usuario admin:", error);
  }
}

createAdminUser();
