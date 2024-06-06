const pool = require('../utils/database');

async function isUserExists(name) {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM users WHERE name = ?', [name]);

    return rows[0].count > 0;
}

async function createUser({ name, password }) {
    const [result] = await pool.query('INSERT INTO users (name, password) VALUES (?, ?)', [name, password]);

    return result.insertId;
}

module.exports = { isUserExists, createUser };