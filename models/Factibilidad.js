import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Factibilidad = db.define(
  "Factibilidad",
  {
    orden: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    presupuesto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "factibilidades",
    timestamps: false,
  }
);

export default Factibilidad;
