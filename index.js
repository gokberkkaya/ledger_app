const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const userRoutes = require('./src/routes/userRoute');
const balanceRoutes = require('./src/routes/balanceRoute');
const transferRoutes = require('./src/routes/transferRoute');
const { isAuthenticated } = require('./src/middleware/auth');
require('./src/utils/passport')(passport);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use('/auth', userRoutes);
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
