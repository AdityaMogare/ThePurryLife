const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Loads .env file contents into process.env

// 1. Initialize Express App
const app = express();
const PORT = process.env.PORT || 5001; // Use 5001 as a common backend port

// 2. Apply Middleware
app.use(cors()); // Allows requests from other origins (i.e., your React frontend)
app.use(express.json()); // Allows the server to accept and parse JSON data

// 3. (We will add Mongoose connection here)
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

// 4. (We will add API routes here)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ThePurryLife API!' });
});

// 5. Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});