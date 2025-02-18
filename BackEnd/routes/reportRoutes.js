// report routes

const express = require('express');
const { getMonthlyReport } = require('../controllers/reportController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(verifyToken);

router.get('/monthly', getMonthlyReport);

module.exports = router;
