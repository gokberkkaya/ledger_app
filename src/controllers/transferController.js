const transferService = require('../services/transferService');

async function transferCredits(req, res, next) {
    try {
        const { fromUsername, toUsername, amount } = req.body;

        await transferService.transferCredits(fromUsername, toUsername, amount);

        res.status(200).json({ success: { fromUsername, toUsername, amount }});
    } catch (error) {
        if (error === 'Insufficient funds!') {
            res.status(400).json({ error });
        } else if (error === 'User not found!') {
            res.status(404).json({ error });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = { transferCredits };
