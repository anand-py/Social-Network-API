const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes')

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
app.use('/api/posts', postRoutes);

// Start the server

const User = require('./models/user.model');





app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});
