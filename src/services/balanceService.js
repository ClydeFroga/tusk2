class BalanceService {
  constructor(User) {
    this.User = User;
  }

  async updateBalance(userId, amount) {
    const operationAmount = parseFloat(amount);

    try {
      const user = await this.User.findByPk(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const currentBalance = user.balance;

      if (amount < 0 && currentBalance < Math.abs(operationAmount)) {
        throw new Error("Insufficient funds");
      }

      user.balance = parseFloat(currentBalance) + operationAmount;
      await user.save();

      return {
        newBalance: user.balance,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BalanceService;
