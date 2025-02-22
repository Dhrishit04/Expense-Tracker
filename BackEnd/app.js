// Load environment variables
require('dotenv').config();

const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/reports', reportRoutes);

// Sync Database and Start Server
sequelize.sync().then(() => {
   app.listen(5000, () => {
       console.log('Server is running on http://localhost:5000');
   });
});
