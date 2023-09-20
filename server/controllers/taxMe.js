// routes/tax.js
const jwt = require('jsonwebtoken');
const Tax = require('../models/tax')

require("dotenv").config();
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    req.user = decoded;
    next();
  });
};

exports.taxMe = ('/tax', authenticateUser, async (req, res) => {
  try {
    const { panCard, incomeSalary, incomeShareMarket, dueDate } = req.body;
    const createdBy = req.user.username;

    const totalTaxDue = incomeSalary + incomeShareMarket;

    const status = dueDate < new Date() ? 'DELAYED' : 'NEW';
    const tax = new Tax({
      panCard,
      incomeSalary,
      incomeShareMarket,
      totalTaxDue,
      dueDate,
      status,
      createdBy,
    });
    await tax.save();
    res.json({ message: 'Tax record created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Tax creation failed' });
  }
});