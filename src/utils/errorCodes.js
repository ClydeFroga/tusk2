/**
 * Коды ошибок для приложения
 */

// Общие ошибки
const ERROR_CODES = {
  // Общие ошибки
  INTERNAL_SERVER_ERROR: {
    code: 1000,
    status: 500,
    message: "Внутренняя ошибка сервера",
  },
  INVALID_REQUEST: {
    code: 1001,
    status: 400,
    message: "Неверный запрос",
  },
  UNAUTHORIZED: {
    code: 1002,
    status: 401,
    message: "Не авторизован",
  },
  FORBIDDEN: {
    code: 1003,
    status: 403,
    message: "Доступ запрещен",
  },
  NOT_FOUND: {
    code: 1004,
    status: 404,
    message: "Ресурс не найден",
  },

  // Ошибки пользователей
  USER_NOT_FOUND: {
    code: 2000,
    status: 404,
    message: "Пользователь не найден",
  },
  USER_ALREADY_EXISTS: {
    code: 2001,
    status: 409,
    message: "Пользователь уже существует",
  },
  INVALID_CREDENTIALS: {
    code: 2002,
    status: 401,
    message: "Неверные учетные данные",
  },

  // Ошибки баланса
  INSUFFICIENT_FUNDS: {
    code: 3000,
    status: 400,
    message: "Недостаточно средств",
  },
  INVALID_AMOUNT: {
    code: 3001,
    status: 400,
    message: "Неверная сумма",
  },

  // Ошибки базы данных
  DATABASE_ERROR: {
    code: 4000,
    status: 500,
    message: "Ошибка базы данных",
  },
  TRANSACTION_FAILED: {
    code: 4001,
    status: 500,
    message: "Транзакция не выполнена",
  },
};

/**
 * Класс для создания ошибок с кодами
 */
class AppError extends Error {
  constructor(errorCode, details = null) {
    const error = ERROR_CODES[errorCode];

    if (!error) {
      super("Неизвестная ошибка");
      this.code = 1000;
      this.status = 500;
    } else {
      super(error.message);
      this.code = error.code;
      this.status = error.status;
      this.errorCode = errorCode;
    }

    if (details) {
      this.details = details;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  ERROR_CODES,
  AppError,
};
