//Reporting logic

const Expense = require('../models/Expense');
const Income = require('../models/Income');

exports.getMonthlyReport = async (req, res) => {
    const { month, year } = req.query;

    try {
        const expenses = await Expense.findAll({
            where: { 
                userId: req.user.id,
                date: {
                    $between: [`${year}-${month}-01`, `${year}-${month}-31`],
                },
            },
        });

        const income = await Income.findAll({
            where: {
                userId: req.user.id,
                date: {
                    $between: [`${year}-${month}-01`, `${year}-${month}-31`],
                },
            },
        });

        const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);

        res.status(200).json({
            totalIncome,
            totalExpenses,
            savings: totalIncome - totalExpenses,
            expensesByCategory: expenses.reduce((acc, exp) => {
                acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
                return acc;
            }, {}),
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate report' });
    }
};
