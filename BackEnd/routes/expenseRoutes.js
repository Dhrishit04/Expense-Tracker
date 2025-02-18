
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Route to add a new expense
router.post('/add', expenseController.addExpense);

// Route to get all expenses with filters and analytics
router.get('/all', expenseController.getExpenses);

module.exports = router;
