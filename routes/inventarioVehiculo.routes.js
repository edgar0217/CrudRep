import { Router } from "express";
import { isAdmin } from "../middlewares/auth.js";
import {
  renderInventario,
  crearVehiculo,
  editarVehiculo,
  eliminarVehiculo,
} from "../controllers/inventarioVehiculoAdmin.js";

export const router = Router();

router.get("/inventario-vehiculos", isAdmin, renderInventario);
router.post("/inventario-vehiculos", isAdmin, crearVehiculo);
router.post("/inventario-vehiculos/:id/edit", isAdmin, editarVehiculo);
router.post("/inventario-vehiculos/:id/delete", isAdmin, eliminarVehiculo);
