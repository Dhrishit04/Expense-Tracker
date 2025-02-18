
const Expense = require('../Models/Expense');

// Add a new expense
exports.addExpense = async (req, res) => {
    try {
        const { amount, description, category, isRecurring, recurrenceInterval } = req.body;
        const newExpense = await Expense.create({ amount, description, category, isRecurring, recurrenceInterval });
        res.status(201).json({ success: true, data: newExpense });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error adding expense', error: err.message });
    }
};

// Get all expenses with filters and analytics
exports.getExpenses = async (req, res) => {
    try {
        const { category, startDate, endDate } = req.query;

        const filter = {};
        if (category) filter.category = category;
        if (startDate && endDate) {
            filter.createdAt = {
                $between: [new Date(startDate), new Date(endDate)]
            };
        }

        const expenses = await Expense.findAll({ where: filter });

        const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        res.status(200).json({
            success: true,
            data: expenses,
            totalAmount,
            analytics: {
                count: expenses.length,
                average: expenses.length ? totalAmount / expenses.length : 0
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error retrieving expenses', error: err.message });
    }
};
