const pool = require('../utils/database');

async function isUserExists(username) {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM balances WHERE username = ?', [username]);

    return rows[0].count > 0;
}

async function updateCreditToUser(username, amount, currentTime) {
    const [result] = await pool.query(`
        UPDATE balances SET amount = ?, time = ? WHERE username = ?
        `, [amount, currentTime, username]);

    return result.affectedRows;
}

async function giveCreditToUser(username, amount, currentTime) {
    const [result] = await pool.query(`
        INSERT INTO balances (username, amount, time) VALUES (?, ?, ?)
        `, [username, amount, currentTime]);

    return result.insertId;
}

async function getAllUserBalances() {
    const [rows] = await pool.query('SELECT * FROM balances');

    return rows;
}

async function getBalanceByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM balances WHERE username = ?', [username]);

    if (rows.length === 0) {
        throw ('User not found!');
    }

    return rows[0];
}

async function getBalanceAtTime(username, timestamp) {
    const [rows] = await pool.query(`
        SELECT amount FROM balances 
        WHERE username = ? AND time <= ? 
        ORDER BY time DESC LIMIT 1
    `, [username, timestamp]);

    return rows[0];
}

module.exports = { 
    isUserExists,
    updateCreditToUser,
    giveCreditToUser,
    getAllUserBalances,
    getBalanceByUsername,
    getBalanceAtTime
};
