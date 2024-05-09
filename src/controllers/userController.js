const userModel = require('../models/user');

async function createUser(req, res, next) {
    try {
        const { name } = req.body;
        const userId = await userModel.createUser(name);

        res.status(201).json({ id: userId, name });
    } catch (error) {
        next(error);
    }
}

module.exports = { createUser };