require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const postsRouter = require('./routes/posts');

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON bodies

// serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API
app.use('/api/posts', postsRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Mongo connection error', err);
  });
