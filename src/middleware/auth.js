const passport = require('passport');

exports.isAuthenticated = passport.authenticate('jwt', { session: false });

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'No access!' });
    }

    next();
};
