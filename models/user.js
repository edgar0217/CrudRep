import DataTypes from "sequelize";
import db from "../config/database.js";

const User = db.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
      allowNull: false,
    },
  },
  {
    tableName: "users", // Opcional, pero recomendable
  }
);

export default User;
