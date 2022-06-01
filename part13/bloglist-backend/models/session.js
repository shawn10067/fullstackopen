const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Session extends Model {}

Session.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "session",
  }
);

module.exports = Session;
