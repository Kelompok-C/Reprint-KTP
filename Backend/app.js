const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db.config');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
const requestRoutes = require('./routes/requests.routes');
app.use('/api', requestRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the KTP Reprint API");
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
