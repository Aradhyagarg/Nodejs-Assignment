const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['tax-payer', 'tax-accountant', 'admin'],
      required: true,
    },
  });

  
  module.exports = mongoose.model('User', userSchema);