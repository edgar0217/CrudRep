import Factibilidad from "../models/Factibilidad.js";
import { Op } from "sequelize";

export const listarFactibilidades = async (req, res) => {
  const { q = "", order = "" } = req.query;

  const where = q
    ? {
        [Op.or]: [
          { orden: { [Op.iLike]: `%${q}%` } },
          { num_economico: { [Op.iLike]: `%${q}%` } },
          { concepto: { [Op.iLike]: `%${q}%` } },
        ],
      }
    : {};

  let orderBy = [];
  if (order === "orden_asc") orderBy = [["orden", "ASC"]];
  else if (order === "orden_desc") orderBy = [["orden", "DESC"]];
  else if (order === "presupuesto_asc") orderBy = [["presupuesto", "ASC"]];
  else if (order === "presupuesto_desc") orderBy = [["presupuesto", "DESC"]];
  else if (order === "fecha_asc") orderBy = [["fecha", "ASC"]];
  else if (order === "fecha_desc") orderBy = [["fecha", "DESC"]];
  else if (order === "num_economico_asc") orderBy = [["num_economico", "ASC"]];
  else if (order === "num_economico_desc")
    orderBy = [["num_economico", "DESC"]];

  const factibilidades = await Factibilidad.findAll({ where, order: orderBy });
  res.render("admin/factibilidadAdmin", { factibilidades, q, order });
};

export const crearFactibilidad = async (req, res) => {
  const {
    num_economico,
    fecha,
    concepto,
    valor_comercial,
    valor_actual,
    venta_compra,
    presupuesto_reparacion,
    control_gastos,
    orden,
    presupuesto,
  } = req.body;

  await Factibilidad.create({
    num_economico,
    fecha,
    concepto,
    valor_comercial,
    valor_actual,
    venta_compra: venta_compra === "true",
    presupuesto_reparacion,
    control_gastos,
    orden,
    presupuesto,
  });
  res.redirect("/admin/factibilidad");
};

export const eliminarFactibilidad = async (req, res) => {
  const { id } = req.params;
  await Factibilidad.destroy({ where: { id } });
  res.redirect("/admin/factibilidad");
};

export const editarFactibilidad = async (req, res) => {
  const { id } = req.params;
  const {
    num_economico,
    fecha,
    concepto,
    valor_comercial,
    valor_actual,
    venta_compra,
    presupuesto_reparacion,
    control_gastos,
    orden,
    presupuesto,
  } = req.body;

  await Factibilidad.update(
    {
      num_economico,
      fecha,
      concepto,
      valor_comercial,
      valor_actual,
      venta_compra: venta_compra === "true",
      presupuesto_reparacion,
      control_gastos,
      orden,
      presupuesto,
    },
    { where: { id } }
  );
  res.redirect("/admin/factibilidad");
};
