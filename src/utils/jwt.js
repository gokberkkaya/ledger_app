require('dotenv').config();

module.exports = {
    secretOrKey: process.env.JWT_SECRET_KEY,
    expiresIn: '1h'
};
