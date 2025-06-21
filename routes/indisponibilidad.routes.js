// routes/indisponibilidad.routes.js
import { Router } from "express";
import { isAdmin } from "../middlewares/auth.js";
import {
  renderIndisponibilidades,
  crearIndisponibilidad,
  editarIndisponibilidad,
  eliminarIndisponibilidad,
} from "../controllers/indisponibilidadAdmin.js";

export const router = Router();

router.get("/", isAdmin, renderIndisponibilidades);
router.post("/", isAdmin, crearIndisponibilidad);
router.post("/:id/edit", isAdmin, editarIndisponibilidad);
router.post("/:id/delete", isAdmin, eliminarIndisponibilidad);
