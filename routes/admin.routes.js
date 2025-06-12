import { Router } from "express";
import { isAdmin } from "../middlewares/auth.js";
import {
  renderDashboard,
  renderReparaciones,
  crearReparacion,
  editarReparacion,
  eliminarReparacion,
} from "../controllers/reparacionAdmin.js";

export const router = Router();

// Menú principal admin
router.get("/dashboard", isAdmin, renderDashboard);

// Página de reparaciones
router.get("/reparaciones", isAdmin, renderReparaciones);

// Crear reparación
router.post("/reparaciones", isAdmin, crearReparacion);

// Editar reparación
router.post("/reparaciones/:id/edit", isAdmin, editarReparacion);

// Eliminar reparación
router.post("/reparaciones/:id/delete", isAdmin, eliminarReparacion);
