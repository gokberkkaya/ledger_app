const userService = require('../services/userService');

async function createUser(req, res, next) {
    try {
        const { name, password } = req.body;

        await userService.createUser(name, password);

        res.status(201).json({ success: 'User created successfully.'});
    } catch (error) {
        res.status(400).json({ error: (error.message ? 'Invalid request!' : error) });
    }
}

module.exports = { createUser };