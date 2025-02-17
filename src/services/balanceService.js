class BalanceService {
  constructor(User) {
    this.User = User;
  }

  async updateBalance(userId, amount, operation) {
    const operationAmount = parseFloat(amount);

    try {
      const [user] = await this.User.sequelize.query(
          `
            SELECT id, balance
            FROM users
            WHERE id = :userId
          `,
          {
            replacements: { userId },
            type: this.User.sequelize.QueryTypes.SELECT,
          }
      );

      if (!user) {
        throw new Error('User not found');
      }

      const { balance } = user;

      if (operation === 'debit' && balance < operationAmount) {
        throw new Error('Insufficient funds');
      }

      const [results] = await this.User.sequelize.query(
          `
          UPDATE users
          SET balance = CASE
                          WHEN :operation = 'credit' THEN balance + :amount
                          WHEN :operation = 'debit' THEN balance - :amount
                        END
          WHERE id = :userId AND (:operation = 'credit' OR (:operation = 'debit' AND balance >= :amount))
          RETURNING id, balance AS "newBalance"
        `,
          {
            replacements: {
              userId,
              amount: operationAmount,
              operation,
            },
            type: this.User.sequelize.QueryTypes.UPDATE,
          }
      );

      if (!results || results.length === 0) {
        throw new Error('Insufficient funds');
      }

      const result = results[0];

      return {
        userId: result.id,
        newBalance: result.newBalance,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BalanceService;
