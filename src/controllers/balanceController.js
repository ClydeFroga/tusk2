const BalanceService = require("../services/balanceService");

class BalanceController {
  constructor(User) {
    this.balanceService = new BalanceService(User);
  }

  async updateBalance(req, res) {
    const { userId, amount } = req.body;

    try {
      const result = await this.balanceService.updateBalance(userId, amount);
      return res.json(result);
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).json({ error: error.message });
      }

      if (error.message === "Insufficient funds") {
        return res.status(400).json({ error: error.message });
      }

      console.error("Error details:", error);
      return res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }
}

// Экспортируем класс контроллера вместо его экземпляра
module.exports = BalanceController;
