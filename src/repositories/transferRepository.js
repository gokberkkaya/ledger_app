const transferModel = require('../models/Transfer');

async function transferCredits(fromUsername, senderBalance, toUsername, receiverBalance, amount) {
    const currentTime = Math.floor(Date.now() / 1000);
    const transfer = await transferModel.transferCredits(fromUsername, toUsername, amount, currentTime);

    if (transfer) {
        await transferModel.setTransferDataToHistory(
            fromUsername, senderBalance, toUsername, receiverBalance, amount, currentTime
        );
    }
}

module.exports = { transferCredits };
