const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");
const UserModel = require("../models/User");

let sequelize;

async function createDatabaseIfNotExists() {
  try {
    const tempSequelize = new Sequelize({
      ...dbConfig,
      database: "postgres",
    });

    const [results] = await tempSequelize.query(
      "SELECT 1 FROM pg_database WHERE datname = 'balance_db'"
    );

    if (results.length === 0) {
      await tempSequelize.query("CREATE DATABASE balance_db");
      console.log("Database balance_db created successfully");
    }

    await tempSequelize.close();
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  }
}

function initializeDatabase() {
  sequelize = new Sequelize(dbConfig);

  // Initialize models
  const User = UserModel(sequelize);

  return {
    sequelize,
    User,
  };
}

module.exports = {
  createDatabaseIfNotExists,
  initializeDatabase,
};
