import { Router } from "express";
import { isAdmin } from "../middlewares/auth.js";
import {
  listarBajas,
  crearBaja,
  eliminarBaja,
  actualizarBaja,
} from "../controllers/bajasController.js";

export const router = Router();

router.get("/", isAdmin, listarBajas);
router.post("/", isAdmin, crearBaja);
router.post("/:id/delete", isAdmin, eliminarBaja);
router.post("/:id/edit", isAdmin, actualizarBaja);
