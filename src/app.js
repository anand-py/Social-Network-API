const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');

require('dotenv').config();
const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection;
db.on('error', () => {
    console.log('error while connecting to db');
});
db.once('open', () => {
    console.log('connected to db');
});

// Routes
app.use('/api/users', userRoutes);

// Start the server

app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});
