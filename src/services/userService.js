const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const { isValidUsername } = require('../utils/validation');

async function createUser(name, password) {
    if (!isValidUsername(name)) {
        throw 'Invalid username! Please use letters or numbers only.';
    }

    const isUserExists = await userRepository.isUserExists(name);

    if (isUserExists) {
        throw 'User already exists!';
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await userRepository.createUser({ name, password: hashedPassword });
}

module.exports = { createUser };
