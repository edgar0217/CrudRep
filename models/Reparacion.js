import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Reparacion = db.define(
  "Reparacion",
  {
    economico: { type: DataTypes.STRING, allowNull: false, unique: true },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    taller: { type: DataTypes.STRING, allowNull: false },
    cotiza: { type: DataTypes.STRING },
    concepto: { type: DataTypes.STRING },
    orden: { type: DataTypes.STRING },
    importe: { type: DataTypes.DECIMAL(12, 2) },
    autorizacion: { type: DataTypes.STRING },
    pagos: { type: DataTypes.STRING },
    pagado: { type: DataTypes.BOOLEAN, defaultValue: false },
    observacion: { type: DataTypes.TEXT },
    num_contrato: { type: DataTypes.STRING },
  },
  {
    tableName: "reparaciones",
    timestamps: false,
  }
);

export default Reparacion;
