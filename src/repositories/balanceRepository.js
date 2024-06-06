const balanceModel = require('../models/Balance');

async function giveCreditToUser(username, amount) {
    const isUserExists = await balanceModel.isUserExists(username);

    if (isUserExists) {
        return await balanceModel.updateCreditToUser(username, amount);
    } else {
        return await balanceModel.giveCreditToUser(username, amount);
    }
}

async function getAllUserBalances() {
    return await balanceModel.getAllUserBalances();
}

async function getBalanceByUsername(username) {
    return await balanceModel.getBalanceByUsername(username);
}

module.exports = { giveCreditToUser, getAllUserBalances, getBalanceByUsername };
