const { ERROR_CODES } = require("../utils/errorCodes");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Если это наша кастомная ошибка с кодом
  if (err.code && err.status) {
    return res.status(err.status).json({
      error: err.message,
      code: err.code,
      details: err.details || undefined,
    });
  }

  // Для необработанных ошибок
  const internalError = ERROR_CODES.INTERNAL_SERVER_ERROR;
  res.status(internalError.status).json({
    error: internalError.message,
    code: internalError.code,
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

module.exports = errorHandler;
