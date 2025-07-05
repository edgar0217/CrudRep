import BajaVehiculo from "../models/BajaVehiculo.js";
import { Op } from "sequelize";

export const listarBajas = async (req, res) => {
  const { q = "", order = "economico_asc" } = req.query;

  const where = {};
  if (q) {
    where[Op.or] = [
      { economico: { [Op.like]: `%${q}%` } },
      { marca: { [Op.like]: `%${q}%` } },
      { placas: { [Op.like]: `%${q}%` } },
      { modelo: { [Op.like]: `%${q}%` } },
    ];
  }

  let orderBy = [];
  switch (order) {
    case "economico_asc":
      orderBy = [["economico", "ASC"]];
      break;
    case "economico_desc":
      orderBy = [["economico", "DESC"]];
      break;
    case "anio_asc":
      orderBy = [["anio_baja", "ASC"]];
      break;
    case "anio_desc":
      orderBy = [["anio_baja", "DESC"]];
      break;
    case "marca_az":
      orderBy = [["marca", "ASC"]];
      break;
    case "marca_za":
      orderBy = [["marca", "DESC"]];
      break;
  }

  const bajas = await BajaVehiculo.findAll({
    where,
    order: orderBy,
  });

  res.render("admin/bajasAdmin", { bajas, q, order });
};

export const crearBaja = async (req, res) => {
  const { economico, marca, placas, modelo, anio_baja } = req.body;
  await BajaVehiculo.create({ economico, marca, placas, modelo, anio_baja });
  res.redirect("/admin/bajas");
};

export const eliminarBaja = async (req, res) => {
  const { id } = req.params;
  await BajaVehiculo.destroy({ where: { id } });
  res.redirect("/admin/bajas");
};

export const actualizarBaja = async (req, res) => {
  const { id } = req.params;
  const { economico, marca, placas, modelo, anio_baja } = req.body;
  await BajaVehiculo.update(
    { economico, marca, placas, modelo, anio_baja },
    { where: { id } }
  );
  res.redirect("/admin/bajas");
};
