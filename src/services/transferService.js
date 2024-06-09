const transferRepository = require('../repositories/transferRepository');
const balanceRepository = require('../repositories/balanceRepository');

async function transferCredits(fromUsername, toUsername, amount) {
    const sender = await balanceRepository.getBalanceByUsername(fromUsername);
    const receiver = await balanceRepository.getBalanceByUsername(toUsername);

    await transferRepository.transferCredits(
        fromUsername, sender.amount, toUsername, receiver.amount, amount
    );
}

module.exports = { transferCredits };
