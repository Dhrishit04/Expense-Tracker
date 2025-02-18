// user logic

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
   const { name, email, password } = req.body;

   try {
       const hashedPassword = await bcrypt.hash(password, 10);
       const user = await User.create({ name, email, password: hashedPassword });
       res.status(201).json({ message: 'User registered successfully' });
   } catch (error) {
       res.status(500).json({ error: 'Failed to register user' });
   }
};

exports.login = async (req, res) => {
   const { email, password } = req.body;

   try {
       const user = await User.findOne({ where: { email } });
       if (!user) return res.status(404).json({ error: 'User not found' });

       const isValid = await bcrypt.compare(password, user.password);
       if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

       const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
       res.status(200).json({ token });
   } catch (error) {
       res.status(500).json({ error: 'Failed to login' });
   }
};
