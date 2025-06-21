import { DataTypes } from "sequelize";
import db from "../config/database.js";

const InventarioVehiculo = db.define(
  "InventarioVehiculo",
  {
    equipo: { type: DataTypes.STRING, allowNull: false },
    denominacion: { type: DataTypes.STRING, allowNull: false },
    fabricante: { type: DataTypes.STRING, allowNull: false },
    ano: { type: DataTypes.STRING, allowNull: false },
    matricula: { type: DataTypes.STRING, allowNull: false },
    vin: { type: DataTypes.STRING, allowNull: false },
    motor: { type: DataTypes.STRING, allowNull: false },
    departamento: { type: DataTypes.STRING, allowNull: false },
    area: { type: DataTypes.STRING, allowNull: false },
    clasificacion: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "inventario_vehiculos",
    timestamps: false,
  }
);

export default InventarioVehiculo;
