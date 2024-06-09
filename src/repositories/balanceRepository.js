const balanceModel = require('../models/Balance');

async function giveCreditToUser(username, amount) {
    const isUserExists = await balanceModel.isUserExists(username);
    const currentTime = Math.floor(Date.now() / 1000);

    if (isUserExists) {
        return await balanceModel.updateCreditToUser(username, amount, currentTime);
    } else {
        return await balanceModel.giveCreditToUser(username, amount, currentTime);
    }
}

async function getAllUserBalances() {
    return await balanceModel.getAllUserBalances();
}

async function getBalanceByUsername(username) {
    return await balanceModel.getBalanceByUsername(username);
}

async function getBalanceAtTime(username, timestamp) {
    return await balanceModel.getBalanceAtTime(username, timestamp);
}

module.exports = {
    giveCreditToUser, 
    getAllUserBalances,
    getBalanceByUsername,
    getBalanceAtTime
};
