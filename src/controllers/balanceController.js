const BalanceService = require("../services/balanceService");
const { AppError } = require("../utils/errorCodes");

class BalanceController {
  constructor(User) {
    this.balanceService = new BalanceService(User);
  }

  async updateBalance(req, res, next) {
    const { userId, amount } = req.body;

    try {
      // Проверка входных данных
      if (!userId || amount === undefined) {
        return next(
          new AppError("INVALID_REQUEST", {
            message: "Отсутствуют обязательные поля: userId и amount",
          })
        );
      }

      const result = await this.balanceService.updateBalance(userId, amount);
      return res.json(result);
    } catch (error) {
      // Все ошибки уже обработаны в сервисе, просто передаем их дальше
      return next(error);
    }
  }
}

// Экспортируем класс контроллера вместо его экземпляра
module.exports = BalanceController;
