const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sessions", {
      user_id: {
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
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions");
  },
};
