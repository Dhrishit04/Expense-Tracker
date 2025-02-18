// income schema

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Income = sequelize.define('Income', {
    source: {
        type: DataTypes.STRING,
        allowNull: false, // Source of the income (e.g., salary, freelance, etc.)
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false, // Income amount
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false, // Date of income
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Associated user ID (foreign key)
    },
});

module.exports = Income;
