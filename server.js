const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Setup Express app
const app = express();

// Connect to the Database (and create it if it doesn't exist)
mongoose.connect('mongodb://localhost/erpdevdb');
mongoose.Promise = global.Promise;
mongoose.connection.once('open', () => {
  console.log('MongoDB>  Connection Established');
}).on('error', (error) => {
  console.log(`MongoDB>  Connection Error: ${error}`);
});

// Serve the public files to the user
app.use(express.static('public'));

// Body-Parser Middleware
app.use(bodyParser.json());

// Add routes to Express
app.use('/api/bills', require('./routes/bills'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/items', require('./routes/items'));
app.use('/api/suppliers', require('./routes/suppliers'));

// Error Handling middleware
app.use((err, req, res) => {
  console.log(err.message);
  res.status(422).send({ error: err.message });
});

// Listen for requests
app.listen(4000, () => {
  console.log('Express>  App Started on port: 4000');
});
