const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: DataTypes.NOW,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
