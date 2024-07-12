const userModel = require('../models/User');

async function isUserExists(username) {
    return await userModel.isUserExists(username);
}

async function createUser({ username, password, role }) {
    return await userModel.createUser({ username, password, role });
}

async function getUserByUsername(username) {
    return await userModel.getUserByUsername(username);
}

module.exports = { isUserExists, createUser, getUserByUsername };
