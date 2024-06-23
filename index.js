const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

console.log(`MONGODB_URI: ${process.env.MONGODB_URI}`); // Check if this prints correctly

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Stock API');
});

// Importing routes
const stockRoutes = require('./routes/stocks');
app.use('/api/stocks', stockRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
