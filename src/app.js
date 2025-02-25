const express = require("express");
const {
  createDatabaseIfNotExists,
  initializeDatabase,
} = require("./utils/database");
const errorHandler = require("./middlewares/errorHandler");
const { runMigrations } = require("../migrations/run-migrations");
const createBalanceRouter = require("./routes/balanceRoutes");

const app = express();

require("http").globalAgent.maxSockets = 2000;
require("https").globalAgent.maxSockets = 2000;

// Middleware
app.use(express.json());

async function startServer() {
  try {
    // Create database if it doesn't exist
    await createDatabaseIfNotExists();

    // Initialize database
    const { sequelize, User } = initializeDatabase();

    // Connect to database
    await sequelize.authenticate();
    console.log("Database connection established.");

    // Run migrations
    await runMigrations();

    // Routes
    app.use("/", createBalanceRouter(User));

    // Error handling
    app.use(errorHandler);

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
