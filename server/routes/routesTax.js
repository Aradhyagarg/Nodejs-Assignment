const express = require('express');
const jwt = require('jsonwebtoken');
const { Tax } = require('../models');
const router = express.Router();

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    req.user = decoded;
    next();
  });
};


router.post('/tax', authenticateUser, async (req, res) => {
  try {
    const { panCard, incomeSalary, incomeShareMarket, dueDate } = req.body;
    const createdBy = req.user.username;
    // Calculate total tax due based on inputs (implement your calculation logic)
    const totalTaxDue = calculateTotalTax(incomeSalary, incomeShareMarket);
    // Determine status based on due date (implement your logic)
    const status = determineStatus(dueDate);
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


router.put('/tax/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const tax = await Tax.findById(id);

    if (!tax) {
      return res.status(404).json({ error: 'Tax record not found' });
    }

    if (tax.isPaid) {
      return res.status(400).json({ error: 'Tax is already paid and cannot be edited' });
    }

    // Implement your logic for updating tax record fields (e.g., totalTaxDue, status)
    const { incomeSalary, incomeShareMarket, dueDate } = req.body;
    tax.totalTaxDue = calculateTotalTax(incomeSalary, incomeShareMarket);
    tax.status = determineStatus(dueDate);

    await tax.save();

    res.json({ message: 'Tax record updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Tax update failed' });
  }
});


router.put('/tax/:id/mark-paid', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const tax = await Tax.findById(id);

    if (!tax) {
      return res.status(404).json({ error: 'Tax record not found' });
    }

    if (tax.isPaid) {
      return res.status(400).json({ error: 'Tax is already marked as paid' });
    }

    tax.isPaid = true;
    await tax.save();

    res.json({ message: 'Tax marked as paid successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Marking tax as paid failed' });
  }
});


router.get('/tax/list', authenticateUser, async (req, res) => {
  try {
    const createdBy = req.user.username;
    const taxRecords = await Tax.find({ createdBy });

    res.json({ taxRecords });
  } catch (error) {
    res.status(500).json({ error: 'Fetching tax records failed' });
  }
});

const calculateTotalTax = (incomeSalary, incomeShareMarket) => {

  return incomeSalary * 0.2 + incomeShareMarket * 0.1;
};


const determineStatus = (dueDate) => {
  return dueDate < new Date() ? 'DELAYED' : 'NEW';
};

module.exports = router;
