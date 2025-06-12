// controllers/reparacionAdmin.js

import Reparacion from "../models/Reparacion.js";
import { Op } from "sequelize";

// Muestra el menú principal de admin (cards)
export function renderDashboard(req, res) {
  res.render("admin/dashboardAdmin", { user: req.session });
}

// Lista de reparaciones (con filtros y orden)
export async function renderReparaciones(req, res) {
  const { q, order = "fecha_desc", pagado } = req.query;
  let where = {};
  if (q) {
    where = {
      [Op.or]: [
        { economico: { [Op.iLike]: `%${q}%` } },
        { orden: { [Op.iLike]: `%${q}%` } },
        { cotiza: { [Op.iLike]: `%${q}%` } },
        { taller: { [Op.iLike]: `%${q}%` } },
      ],
    };
  }
  if (pagado === "si") where.pagado = true;
  if (pagado === "no") where.pagado = false;

  // Ordenamiento
  let orderArr = [];
  if (order === "fecha_desc") orderArr = [["fecha", "DESC"]];
  else if (order === "fecha_asc") orderArr = [["fecha", "ASC"]];
  else if (order === "economico_az") orderArr = [["economico", "ASC"]];
  else if (order === "economico_za") orderArr = [["economico", "DESC"]];
  else if (order === "importe_mayor") orderArr = [["importe", "DESC"]];
  else if (order === "importe_menor") orderArr = [["importe", "ASC"]];
  else if (order === "pagado_si")
    orderArr = [
      ["pagado", "DESC"],
      ["fecha", "DESC"],
    ];
  else if (order === "pagado_no")
    orderArr = [
      ["pagado", "ASC"],
      ["fecha", "DESC"],
    ];

  const reparaciones = await Reparacion.findAll({ where, order: orderArr });

  res.render("admin/reparacionAdmin", {
    user: req.session,
    reparaciones,
    q: q || "",
    order,
    pagado: pagado || "",
  });
}

// Crear reparación
export async function crearReparacion(req, res) {
  try {
    await Reparacion.create(req.body);
    res.redirect("/admin/reparaciones");
  } catch (err) {
    res.status(400).send("Error al crear reparación: " + err.message);
  }
}

// Editar reparación
export async function editarReparacion(req, res) {
  const id = req.params.id;
  const {
    economico,
    fecha,
    taller,
    cotiza,
    concepto,
    orden,
    importe,
    autorizacion,
    pagos,
    pagado,
    num_contrato,
    observacion,
  } = req.body;
  try {
    await Reparacion.update(
      {
        economico,
        fecha,
        taller,
        cotiza,
        concepto,
        orden,
        importe,
        autorizacion,
        pagos,
        pagado: pagado ? true : false,
        num_contrato,
        observacion,
      },
      { where: { id } }
    );
    res.redirect("/admin/reparaciones");
  } catch (err) {
    res.status(400).send("Error al editar reparación: " + err.message);
  }
}

// Eliminar reparación
export async function eliminarReparacion(req, res) {
  const id = req.params.id;
  try {
    await Reparacion.destroy({ where: { id } });
    res.redirect("/admin/reparaciones");
  } catch (err) {
    res.status(400).send("Error al eliminar reparación: " + err.message);
  }
}
