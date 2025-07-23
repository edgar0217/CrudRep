import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Siniestro = db.define(
  "Siniestro",
  {
    economico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tipo_unidad: {
      type: DataTypes.ENUM(
        "SEDAN",
        "HATCHBACK",
        "SUV",
        "PICKUP",
        "CAMIONETA",
        "CAMION",
        "TRAILER",
        "TRACTOCAMION",
        "MOTOCICLETA",
        "BICICLETA",
        "CUATRIMOTO",
        "VAN",
        "MICROBUS",
        "AUTOBUS",
        "PANEL",
        "GRUA",
        "TAXI",
        "UBER",
        "PESADO",
        "LIGERO"
      ),
      allowNull: false,
    },

    poliza: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_reporte: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    num_siniestro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taller_reparacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    importe_reparacion: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "siniestros",
    timestamps: false,
  }
);

export default Siniestro;
