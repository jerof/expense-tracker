const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');
app.use(cors());
app.use(express.json()); 

mongoose.connect('mongodb+srv://nikhilsamuel89:8hQHYNd0CL9qPR52@cluster0.l2tyxex.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get("/api/test", (req, res) => {
    return res.json("test OK 2");
})

app.get("/api/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({message: "Error fetching transactions:", error: error.message});
    }
})

app.post("/api/transaction", async (req, res) => {
    try {
        const {price, name, description, datetime} = req.body;
        const transaction = await Transaction.create({price, name, datetime, description})
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: "Invalid data format", error: error.message });
      }
    });

app.listen(4000);