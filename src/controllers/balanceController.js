class BalanceController {
  constructor(balanceService) {
    this.balanceService = balanceService;
  }

  async updateBalance(req, res) {
    const { userId, amount, operation } = req.body;
    
    try {
      const result = await this.balanceService.updateBalance(userId, amount, operation);
      return res.json({ 
        success: true,
        ...result
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Insufficient funds') {
        return res.status(400).json({ error: error.message });
      }
      if (error.message === 'Invalid operation') {
        return res.status(400).json({ error: error.message });
      }
      
      console.error('Error details:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        details: error.message 
      });
    }
  }
}

module.exports = BalanceController;
