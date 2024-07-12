const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const { isValidUsername } = require('../utils/validation');
const jwtConfig = require('../utils/jwt');

async function createUser(username, password, role) {
    if (!isValidUsername(username)) {
        throw 'Invalid username! Please use letters or numbers only.';
    }

    const isUserExists = await userRepository.isUserExists(username);

    if (isUserExists) {
        throw 'User already exists!';
    }

    return await userRepository.createUser({ username, password, role });
}

async function loginUser(username, password) {
    const user = await userRepository.getUserByUsername(username);

    if (!user) {
        throw 'Invalid username or password!';
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw 'Invalid username or password!';
    }

    const payload = { id: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, jwtConfig.secretOrKey, { expiresIn: jwtConfig.expiresIn });

    return token;
}

module.exports = { createUser, loginUser };
