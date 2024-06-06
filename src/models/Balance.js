const pool = require('../utils/database');

async function isUserExists(username) {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM balances WHERE username = ?', [username]);

    return rows[0].count > 0;
}

async function updateCreditToUser(username, amount) {
    const [result] = await pool.query('UPDATE balances SET amount = ? WHERE username = ?', [amount, username]);

    return result.affectedRows;
}

async function giveCreditToUser(username, amount) {
    const [result] = await pool.query('INSERT INTO balances (username, amount) VALUES (?, ?)', [username, amount]);

    return result.insertId;
}

async function getAllUserBalances() {
    const [rows] = await pool.query('SELECT * FROM balances');

    return rows;
}

async function getBalanceByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM balances WHERE username = ?', [username]);

    return rows[0];
}

module.exports = { isUserExists, updateCreditToUser, giveCreditToUser, getAllUserBalances, getBalanceByUsername };
