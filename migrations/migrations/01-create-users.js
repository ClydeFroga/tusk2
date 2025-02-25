const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    });

    // Add initial user with balance 10000
    await queryInterface.bulkInsert("users", [
      {
        balance: 10000,
      },
    ]);
  },
};
