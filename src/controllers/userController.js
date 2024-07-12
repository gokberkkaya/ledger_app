const userService = require('../services/userService');

async function createUser(req, res, next) {
    try {
        const { username, password, role } = req.body;

        await userService.createUser(username, password, role);

        res.status(201).json({ success: 'User created successfully.' });
    } catch (error) {
        res.status(400).json({ error: (error.message ? 'Invalid request!' : error) });
    }
}

async function loginUser(req, res, next) {
    try {
        const { username, password } = req.body;
        const token = await userService.loginUser(username, password);

        res.status(200).json({ success: 'Login successful.', token });
    } catch (error) {
        res.status(400).json({ error: (error.message ? 'Invalid request!' : error) });
    }
}

module.exports = { createUser, loginUser };
