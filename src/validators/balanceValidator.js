const validateUpdateBalance = (req, res, next) => {
  const { userId, amount, operation } = req.body;

  if (!userId || !amount || !operation) {
    return res.status(400).json({ error: 'userId, amount, and operation are required' });
  }

  if (isNaN(amount) || parseFloat(amount) <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }

  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({ error: 'userId must be a positive integer' });
  }

  if (!['credit', 'debit'].includes(operation)) {
    return res.status(400).json({ error: 'operation must be either "credit" or "debit"' });
  }

  next();
};

module.exports = {
  validateUpdateBalance
};
