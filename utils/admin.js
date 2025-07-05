import bcrypt from "bcrypt";
import User from "./models/user.js"; // Ajusta la ruta si tu modelo está en otro lugar
import db from "./config/database.js";

async function createAdmin() {
  try {
    // Conectarse a la base de datos
    await db.authenticate();
    console.log("Conexión establecida correctamente.");

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash("123", 10); // SaltRounds = 10

    // Crear el usuario admin
    const admin = await User.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Usuario administrador creado:", admin.username);
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error.message);
  } finally {
    await db.close();
  }
}

createAdmin();
