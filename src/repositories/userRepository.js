const userModel = require('../models/User');

async function isUserExists(name) {
    return await userModel.isUserExists(name);
}

async function createUser({ name, password }) {
    return await userModel.createUser({ name, password });
}

module.exports = { isUserExists, createUser };
