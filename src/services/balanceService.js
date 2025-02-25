const { AppError } = require("../utils/errorCodes");

class BalanceService {
  constructor(User) {
    this.User = User;
  }

  async updateBalance(userId, amount) {
    const operationAmount = parseFloat(amount);

    try {
      const user = await this.User.findByPk(userId);

      if (!user) {
        throw new AppError("USER_NOT_FOUND", { userId });
      }

      const currentBalance = user.balance;

      if (amount < 0 && currentBalance < Math.abs(operationAmount)) {
        throw new AppError("INSUFFICIENT_FUNDS", {
          userId,
          currentBalance,
          requestedAmount: operationAmount,
        });
      }

      user.balance = parseFloat(currentBalance) + operationAmount;
      await user.save();

      return {
        newBalance: user.balance,
      };
    } catch (error) {
      // Если это уже наша кастомная ошибка AppError, просто передаем ее дальше
      if (error instanceof AppError) {
        throw error;
      }

      // Для ошибок базы данных
      if (
        error.name === "SequelizeError" ||
        error.name === "SequelizeDatabaseError"
      ) {
        throw new AppError("DATABASE_ERROR", { originalError: error.message });
      }

      // Для всех остальных ошибок
      throw new AppError("INTERNAL_SERVER_ERROR", {
        originalError: error.message,
      });
    }
  }
}

module.exports = BalanceService;
