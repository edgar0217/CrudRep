import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import db from "./config/database.js";

// __dirname workaround for ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Import routes
import { router as authRoutes } from "./routes/auth.routes.js";
import { router as adminRoutes } from "./routes/admin.routes.js";
import { router as indisponibilidadRoutes } from "./routes/indisponibilidad.routes.js";
import { router as inventarioVehiculoRoutes } from "./routes/inventarioVehiculo.routes.js";
import { router as factibilidadRoutes } from "./routes/factibilidad.routes.js";
import { router as bajasRoutes } from "./routes/bajas.routes.js";

app.use("/", authRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/indisponibilidad", indisponibilidadRoutes);
app.use("/admin", inventarioVehiculoRoutes);
app.use("/admin/factibilidad", factibilidadRoutes);
app.use("/admin/bajas", bajasRoutes);

// Database sync
db.sync().then(() => {
  console.log("Base de datos sincronizada");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
