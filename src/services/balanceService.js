const balanceRepository = require('../repositories/balanceRepository');
const userRepository = require('../repositories/userRepository');

async function giveCreditToUser(username, amount) {
    const isUserExists = await userRepository.isUserExists(username);

    if (!isUserExists) {
        throw 'User does not exists!';
    } else {
        if (!Number.isInteger(amount) || amount < 0) {
            throw 'Invalid amount! Please give integer and value greater than 0.';
        }
    
        await balanceRepository.giveCreditToUser(username, amount);
    }
}

async function getAllUserBalances() {
    return await balanceRepository.getAllUserBalances();
}

async function getBalanceByUsername(username) {
    return await balanceRepository.getBalanceByUsername(username);
}

module.exports = { giveCreditToUser, getAllUserBalances, getBalanceByUsername };
