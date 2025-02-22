
// models/index.js
const sequelize = require('../config/database');
const User = require('./User');
const Expense = require('./Expense');
const Income = require('./Income');

// Define associations
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

// (Optional) If income should be associated as well:
User.hasMany(Income, { foreignKey: 'userId' });
Income.belongsTo(User, { foreignKey: 'userId' });

module.exports = {sequelize, User, Expense, Income,};
