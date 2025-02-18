// Income routes

const express = require('express');
const { getIncome, addIncome, updateIncome, deleteIncome } = require('../controllers/incomeController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(verifyToken);

router.get('/', getIncome);
router.post('/', addIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

module.exports = router;
