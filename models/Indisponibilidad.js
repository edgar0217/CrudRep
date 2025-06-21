// models/Indisponibilidad.js
import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Indisponibilidad = db.define(
  "Indisponibilidad",
  {
    economico: { type: DataTypes.STRING, allowNull: false },
    marca: { type: DataTypes.STRING, allowNull: false },
    modelo: { type: DataTypes.STRING, allowNull: false },
    kilometraje: { type: DataTypes.STRING, allowNull: false },
    equipo_hidraulico: { type: DataTypes.ENUM("SÍ", "NO"), defaultValue: "NO" },
    venta: { type: DataTypes.STRING, allowNull: false },
    compra: { type: DataTypes.STRING, allowNull: false },
    fecha_consulta: { type: DataTypes.DATEONLY, allowNull: false },
    promedio_guia_ebc: { type: DataTypes.STRING, allowNull: false },
    valor_60_reparacion: { type: DataTypes.STRING, allowNull: false },
    costo_reparacion: { type: DataTypes.STRING, allowNull: false },
    porcentaje_reparacion: { type: DataTypes.STRING, allowNull: false },
    factible_reparacion: {
      type: DataTypes.ENUM("SÍ", "NO"),
      defaultValue: "NO",
    },
  },
  { tableName: "indisponibilidades", timestamps: false }
);

export default Indisponibilidad;
