const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const BalanceController = require("../controllers/balanceController");
const { AppError } = require("../utils/errorCodes");

function createBalanceRouter(User) {
  const router = Router();
  const balanceController = new BalanceController(User);

  // Валидация
  const validateUpdateBalance = [
    body("userId")
      .exists()
      .withMessage("userId обязателен")
      .isInt({ min: 1 })
      .withMessage("userId должен быть положительным целым числом"),

    body("amount")
      .exists()
      .withMessage("amount обязателен")
      .isFloat()
      .withMessage("amount должен быть числом"),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          new AppError("INVALID_REQUEST", {
            message: errors.array()[0].msg,
            errors: errors.array(),
          })
        );
      }
      next();
    },
  ];

  router.post("/update-balance", validateUpdateBalance, (req, res, next) =>
    balanceController.updateBalance(req, res, next)
  );

  return router;
}

module.exports = createBalanceRouter;
