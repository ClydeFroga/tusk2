const { DataTypes } = require('sequelize');

const UserModel = (sequelize) => {
  const User = sequelize.define('User', {
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  return User;
};

module.exports = UserModel;
