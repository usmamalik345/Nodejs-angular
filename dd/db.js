const mongoose = require('mongoose');

// Replace the URL and the database name with your own values
const url = 'mongodb://localhost:27017/mydatabase';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error(`Error connecting to database: ${err}`);
  });