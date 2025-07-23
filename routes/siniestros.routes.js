import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import {
  listarSiniestros,
  crearSiniestro,
  editarSiniestro,
  eliminarSiniestro,
} from "../controllers/siniestrosController.js";

export const router = express.Router();

router.get("/", isAdmin, listarSiniestros);
router.post("/", isAdmin, crearSiniestro);
router.post("/:id", isAdmin, editarSiniestro);
router.post("/:id/delete", isAdmin, eliminarSiniestro);
