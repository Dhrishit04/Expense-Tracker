//main app setup

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

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Sync Database and Start Server
sequelize.sync().then(() => {
   app.listen(5000, () => {
       console.log('Server is running on http://localhost:5000');
   });
});
