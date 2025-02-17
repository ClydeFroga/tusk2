const dbConfig = {
  host: '192.168.1.28',
  port: 5432,
  username: 'postgres',
  password: 'tpms',
  dialect: 'postgres',
  database: 'balance_db',
  logging: false,
  pool: {
    max: 20, // Уменьшаем максимальное количество соединений
    min: 5,  // Увеличиваем минимальное количество соединений
    acquire: 120000, // Увеличиваем время ожидания соединения
    idle: 10000,
    evict: 1000, // Частота проверки неактивных соединений
    handleDisconnects: true // Автоматическая обработка разрывов соединения
  },
  isolationLevel: 'REPEATABLE READ',
  retry: {
    max: 3 // Количество попыток переподключения
  }
};

module.exports = dbConfig;
