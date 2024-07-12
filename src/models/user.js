const pool = require('../utils/database');
const bcrypt = require('bcrypt');

async function isUserExists(username) {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM users WHERE username = ?', [username]);

    return rows[0].count > 0;
}

async function createUser({ username, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);

    return result.insertId;
}

async function getUserByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    return rows[0];
}

module.exports = { isUserExists, createUser, getUserByUsername };
