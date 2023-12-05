const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    price: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    datetime: {
      type: Date,
      required: true
    }
  });
  

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;