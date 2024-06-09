const pool = require('../utils/database');

async function transferCredits(fromUsername, toUsername, amount, currentTime) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [fromUserBalance] = await connection.query(`
            SELECT amount FROM balances WHERE username = ?
            `, [fromUsername]);

        if (fromUserBalance.length === 0) {
            throw ('User not found!');
        }

        if (fromUserBalance[0].amount < amount) {
            throw ('Insufficient funds!');
        }

        const [toUserBalance] = await connection.query(`
            SELECT amount FROM balances WHERE username = ?
            `, [toUsername]);
        
        if (toUserBalance.length === 0) {
            throw ('User not found!');
        }

        await connection.query(`
            UPDATE balances SET amount = amount - ?, time = ? WHERE username = ?
            `, [amount, currentTime, fromUsername]);
        await connection.query(`
            UPDATE balances SET amount = amount + ?, time = ? WHERE username = ?
            `, [amount, currentTime, toUsername]);

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();

        return true;
    }
}

async function setTransferDataToHistory(
    fromUsername, senderBalance, toUsername, receiverBalance, amount, currentTime
) {
    const [result] = await pool.query(`
        INSERT INTO transfer_history (sender_username, sender_balance, receiver_username, receiver_balance, amount_transferred, time) VALUES (?, ?, ?, ?, ?, ?)
        `, [fromUsername, senderBalance, toUsername, receiverBalance, amount, currentTime]);

    return result.insertId;
}

module.exports = { transferCredits, setTransferDataToHistory };
