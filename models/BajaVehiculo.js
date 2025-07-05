import { DataTypes } from "sequelize";
import db from "../config/database.js";

const BajaVehiculo = db.define(
  "BajaVehiculo",
  {
    economico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    anio_baja: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "bajas_vehiculos",
    timestamps: false,
  }
);

export default BajaVehiculo;
