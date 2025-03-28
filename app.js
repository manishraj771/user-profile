require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

module.exports = app;
