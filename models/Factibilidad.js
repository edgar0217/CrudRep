import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Factibilidad = db.define(
  "Factibilidad",
  {
    num_economico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    concepto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    valor_comercial: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    valor_actual: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    venta_compra: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "True para Venta, False para Compra",
    },
    presupuesto_reparacion: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    control_gastos: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    orden: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    presupuesto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    factible: {
      type: DataTypes.VIRTUAL,
      get() {
        // Lógica para determinar si es factible reparar
        return this.presupuesto_reparacion < this.valor_actual;
      },
    },
  },
  {
    tableName: "factibilidades",
    timestamps: false,
  }
);

export default Factibilidad;
