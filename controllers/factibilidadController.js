import Factibilidad from "../models/Factibilidad.js";
import { Op } from "sequelize";

export const listarFactibilidades = async (req, res) => {
  const { q = "", order = "" } = req.query;

  const where = q ? { orden: { [Op.iLike]: `%${q}%` } } : {};

  let orderBy = [];
  if (order === "orden_asc") orderBy = [["orden", "ASC"]];
  else if (order === "orden_desc") orderBy = [["orden", "DESC"]];
  else if (order === "presupuesto_asc") orderBy = [["presupuesto", "ASC"]];
  else if (order === "presupuesto_desc") orderBy = [["presupuesto", "DESC"]];

  const factibilidades = await Factibilidad.findAll({ where, order: orderBy });
  res.render("admin/factibilidadAdmin", { factibilidades, q, order });
};

export const crearFactibilidad = async (req, res) => {
  const { orden, presupuesto } = req.body;
  await Factibilidad.create({ orden, presupuesto });
  res.redirect("/admin/factibilidad");
};

export const eliminarFactibilidad = async (req, res) => {
  const { id } = req.params;
  await Factibilidad.destroy({ where: { id } });
  res.redirect("/admin/factibilidad");
};
export const editarFactibilidad = async (req, res) => {
  const { id } = req.params;
  const { orden, presupuesto } = req.body;

  await Factibilidad.update({ orden, presupuesto }, { where: { id } });
  res.redirect("/admin/factibilidad");
};
