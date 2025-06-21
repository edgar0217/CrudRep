// controllers/indisponibilidadAdmin.js
import Indisponibilidad from "../models/Indisponibilidad.js";
import { Op } from "sequelize";

// Renderizar lista de indisponibilidades con filtros
export async function renderIndisponibilidades(req, res) {
  const { q, marca, factible } = req.query;
  let where = {};

  if (q) {
    where = {
      ...where,
      [Op.or]: [
        { economico: { [Op.iLike]: `%${q}%` } },
        { marca: { [Op.iLike]: `%${q}%` } },
        { modelo: { [Op.iLike]: `%${q}%` } },
      ],
    };
  }
  if (marca) where.marca = marca;
  if (factible) where.factible_reparacion = factible;

  // Trae todos para lista de marcas únicas (filtro)
  const todas = await Indisponibilidad.findAll();
  const marcas = [...new Set(todas.map((i) => i.marca))].sort();

  // Trae solo filtrados para la tabla
  const indisponibilidades = await Indisponibilidad.findAll({
    where,
    order: [["economico", "ASC"]],
  });

  res.render("admin/indisponibilidadAdmin", {
    user: req.session,
    indisponibilidades,
    marcas,
    q: q || "",
    marca: marca || "",
    factible: factible || "",
  });
}

// Crear
export async function crearIndisponibilidad(req, res) {
  try {
    const data = { ...req.body };
    // Elimina 'id' si está vacío o no existe
    if (!data.id || data.id === "") delete data.id;
    await Indisponibilidad.create(data);
    res.redirect("/admin/indisponibilidad");
  } catch (err) {
    res.status(400).send("Error al crear: " + err.message);
  }
}

// Editar
export async function editarIndisponibilidad(req, res) {
  const id = req.params.id;
  try {
    const data = { ...req.body };
    // Opcional: elimina 'id' si está vacío
    if (data.id === "") delete data.id;
    await Indisponibilidad.update(data, { where: { id } });
    res.redirect("/admin/indisponibilidad");
  } catch (err) {
    res.status(400).send("Error al editar: " + err.message);
  }
}

// Eliminar
export async function eliminarIndisponibilidad(req, res) {
  const id = req.params.id;
  try {
    await Indisponibilidad.destroy({ where: { id } });
    res.redirect("/admin/indisponibilidad");
  } catch (err) {
    res.status(400).send("Error al eliminar: " + err.message);
  }
}
