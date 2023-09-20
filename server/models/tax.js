// models/Tax.js
const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
  panCard: {
    type: String,
    required: true,
  },
  incomeSalary: {
    type: Number,
    required: true,
  },
  incomeShareMarket: {
    type: Number,
    required: true,
  },
  totalTaxDue: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['NEW', 'DELAYED', 'PAID'],
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  paidBy: String,
});

module.exports = mongoose.model('Tax', taxSchema);
