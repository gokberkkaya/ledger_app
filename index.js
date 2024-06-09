const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoute');
const balanceRoutes = require('./src/routes/balanceRoute');
const transferRoutes = require('./src/routes/transferRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/balances', balanceRoutes);
app.use('/transfer', transferRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
