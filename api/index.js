const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const Transaction = require("./models/Transaction.js")

app.use(cors());
app.use(express.json());
app.get("/api/test",(req,res)=>{
    res.json('tess ok');
});

mongoose.set('strictQuery', true);

app.post('/api/transaction', async (req,res)=>{

    const url = process.env.MONGO_URL;
    await mongoose.connect(url);
    const {price,name,description,datetime} = req.body;
    const transaction = await Transaction.create({price,name,description,datetime});
    res.json(transaction);
});

app.get("/api/transactions",async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
});

app.listen(4000);

//EFiYaqqemzsle3WH