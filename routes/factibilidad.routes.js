import { Router } from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  listarFactibilidades,
  crearFactibilidad,
  eliminarFactibilidad,
  editarFactibilidad,
} from "../controllers/factibilidadController.js";

export const router = Router();

router.get("/", isAdmin, listarFactibilidades);
router.post("/", isAdmin, crearFactibilidad);
router.post("/:id/delete", isAdmin, eliminarFactibilidad);
router.post("/:id/edit", isAdmin, editarFactibilidad);
