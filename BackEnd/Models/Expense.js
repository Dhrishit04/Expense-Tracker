const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('Expense', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'General'
    },
    isRecurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    recurrenceInterval: {
        type: DataTypes.ENUM('daily', 'weekly', 'monthly'),
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Optional: Uncomment the following to add a foreign key reference if your User table is named "Users"
        // references: { model: 'Users', key: 'id' }
    }
});

module.exports = Expense;
// Compare this snippet from BackEnd/controllers/expenseController.js: