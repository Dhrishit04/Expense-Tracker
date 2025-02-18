// Income logic

const Income = require('..models/Income');

exports.getIncome = async (req, res) => {
    try {
        const income = await Income.findAll({ where: { userId: req.user.id } });
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch income' });
    }
};

exports.addIncome = async (req, res) => {
    const { source, amount, date } = req.body;

    try {
        const income = await Income.create({ source, amount, date, userId: req.user.id });
        res.status(201).json(income);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add income' });
    }
};

exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { source, amount, date } = req.body;

    try {
        const income = await Income.findOne({ where: { id, userId: req.user.id } });
        if (!income) return res.status(404).json({ error: 'Income not found' });

        await income.update({ source, amount, date });
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update income' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const income = await Income.findOne({ where: { id, userId: req.user.id } });
        if (!income) return res.status(404).json({ error: 'Income not found' });

        await income.destroy();
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete income' });
    }
};
