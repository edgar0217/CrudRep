import { Op } from "sequelize";
import Siniestro from "../models/Siniestro.js";

export const listarSiniestros = async (req, res) => {
  const q = req.query.q || "";
  const order = req.query.order || "";
  const editId = req.query.editId || null;

  // Construir condición de búsqueda
  const where = {};
  if (q) {
    where[Op.or] = [
      { economico: { [Op.iLike]: `%${q}%` } },
      { poliza: { [Op.iLike]: `%${q}%` } },
    ];
  }

  // Construir ordenamiento
  let orderOption = [];
  if (order === "fecha_asc") {
    orderOption = [["fecha", "ASC"]];
  } else if (order === "fecha_desc") {
    orderOption = [["fecha", "DESC"]];
  } else if (order === "importe_asc") {
    orderOption = [["importe_reparacion", "ASC"]];
  } else if (order === "importe_desc") {
    orderOption = [["importe_reparacion", "DESC"]];
  }

  // Ejecutar búsqueda con filtros
  const siniestros = await Siniestro.findAll({
    where,
    order: orderOption,
  });

  // Si está en modo edición, cargar el siniestro a editar
  let siniestroEditar = null;
  if (editId) {
    siniestroEditar = await Siniestro.findByPk(editId);
  }

  res.render("admin/siniestrosAdmin", {
    siniestros,
    q,
    order,
    siniestroEditar,
  });
};

export const crearSiniestro = async (req, res) => {
  await Siniestro.create(req.body);
  res.redirect("/admin/siniestros");
};

export const editarSiniestro = async (req, res) => {
  const { id } = req.params;
  await Siniestro.update(req.body, { where: { id } });
  res.redirect("/admin/siniestros");
};

export const eliminarSiniestro = async (req, res) => {
  const { id } = req.params;
  await Siniestro.destroy({ where: { id } });
  res.redirect("/admin/siniestros");
};
