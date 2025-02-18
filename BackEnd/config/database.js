const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense_tracker', 'root', 'your_mysql_password', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
