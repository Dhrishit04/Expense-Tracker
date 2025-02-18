
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
        defaultValue: 'General' // Default category
    },
    isRecurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false // Indicates if the expense is recurring
    },
    recurrenceInterval: {
        type: DataTypes.ENUM('daily', 'weekly', 'monthly'),
        allowNull: true // Interval for recurring expenses
    }
});

module.exports = Expense;
