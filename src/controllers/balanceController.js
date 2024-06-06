const balanceService = require('../services/balanceService');

async function giveCreditToUser(req, res, next) {
    try {
        const { username, amount } = req.body;

        await balanceService.giveCreditToUser(username, amount);

        res.status(200).json({ success: { username, amount } });
    } catch (error) {
        res.status(400).json({ error });
    }
}

async function getAllUserBalances(req, res, next) {
    try {
        const balances = await balanceService.getAllUserBalances();

        res.status(200).json(balances);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getBalanceByUsername(req, res, next) {
    try {
        const { username } = req.params;
        const balance = await balanceService.getBalanceByUsername(username);

        res.status(200).json({ success: balance });
    } catch (error) {
        if (error.code === 'NOT_FOUND') {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = { giveCreditToUser, getAllUserBalances, getBalanceByUsername };
