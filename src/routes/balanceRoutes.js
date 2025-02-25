const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const BalanceController = require("../controllers/balanceController");

function createBalanceRouter(User) {
  const router = Router();
  const balanceController = new BalanceController(User);

  // Валидация
  const validateUpdateBalance = [
    body("userId")
      .exists()
      .withMessage("userId is required")
      .isInt({ min: 1 })
      .withMessage("userId must be a positive integer"),

    body("amount")
      .exists()
      .withMessage("amount is required")
      .isFloat()
      .withMessage("amount must be a positive number"),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
      }
      next();
    },
  ];

  router.post("/update-balance", validateUpdateBalance, (req, res) =>
    balanceController.updateBalance(req, res)
  );

  return router;
}

module.exports = createBalanceRouter;
