const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const path = require("path");
const dbConfig = require("../src/config/database");

const sequelize = new Sequelize(dbConfig);

const umzug = new Umzug({
  migrations: {
    glob: [
      "migrations/migrations/*.js",
      { cwd: path.resolve(__dirname, "..") },
    ],
    resolve: ({ name, path, context }) => {
      const migration = require(path);
      return {
        name,
        up: async () => migration.up(context),
        down: async () => migration.down(context),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

async function runMigrations() {
  try {
    await umzug.up();
    console.log("All migrations performed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}

module.exports = { runMigrations };
