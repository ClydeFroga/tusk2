const dbConfig = {
  host: "192.168.1.28",
  port: 5432,
  username: "postgres",
  password: "tpms",
  dialect: "postgres",
  database: "balance_db",
  logging: false,
  pool: {
    max: 20,
    min: 5,
    acquire: 120000,
    idle: 10000,
    evict: 1000,
    handleDisconnects: true,
  },
  isolationLevel: "REPEATABLE READ",
  retry: {
    max: 3,
  },
};

module.exports = dbConfig;
