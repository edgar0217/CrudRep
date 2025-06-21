import InventarioVehiculo from "../models/InventarioVehiculo.js";
import { Op } from "sequelize";

// Listar con filtros, búsqueda y orden
export async function renderInventario(req, res) {
  const { q, order = "equipo_asc" } = req.query;
  let where = {};

  if (q) {
    where = {
      [Op.or]: [
        { equipo: { [Op.iLike]: `%${q}%` } },
        { denominacion: { [Op.iLike]: `%${q}%` } },
        { fabricante: { [Op.iLike]: `%${q}%` } },
        { matricula: { [Op.iLike]: `%${q}%` } },
        { vin: { [Op.iLike]: `%${q}%` } },
        { motor: { [Op.iLike]: `%${q}%` } },
        { departamento: { [Op.iLike]: `%${q}%` } },
        { area: { [Op.iLike]: `%${q}%` } },
        { clasificacion: { [Op.iLike]: `%${q}%` } },
        { ano: { [Op.iLike]: `%${q}%` } },
      ],
    };
  }

  // Ordenamiento
  let orderArr = [];
  if (order === "equipo_asc") orderArr = [["equipo", "ASC"]];
  else if (order === "equipo_desc") orderArr = [["equipo", "DESC"]];
  else if (order === "ano_asc") orderArr = [["ano", "ASC"]];
  else if (order === "ano_desc") orderArr = [["ano", "DESC"]];
  else if (order === "departamento_az") orderArr = [["departamento", "ASC"]];
  else if (order === "departamento_za") orderArr = [["departamento", "DESC"]];

  const vehiculos = await InventarioVehiculo.findAll({
    where,
    order: orderArr,
  });

  res.render("admin/inventarioVehiculoAdmin", {
    vehiculos,
    q: q || "",
    order,
  });
}

// Crear
export async function crearVehiculo(req, res) {
  try {
    await InventarioVehiculo.create(req.body);
    res.redirect("/admin/inventario-vehiculos");
  } catch (err) {
    res.status(400).send("Error al crear: " + err.message);
  }
}

// Editar
export async function editarVehiculo(req, res) {
  const id = req.params.id;
  try {
    await InventarioVehiculo.update(req.body, { where: { id } });
    res.redirect("/admin/inventario-vehiculos");
  } catch (err) {
    res.status(400).send("Error al editar: " + err.message);
  }
}

// Eliminar
export async function eliminarVehiculo(req, res) {
  const id = req.params.id;
  try {
    await InventarioVehiculo.destroy({ where: { id } });
    res.redirect("/admin/inventario-vehiculos");
  } catch (err) {
    res.status(400).send("Error al eliminar: " + err.message);
  }
}
