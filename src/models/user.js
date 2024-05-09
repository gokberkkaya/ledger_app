const pool = require('../utils/database');

async function createUser(name) {
    const [result] = await pool.query('INSERT INTO users (name) VALUES (?)', [name]);

    return result.insertId;
}

module.exports = { createUser };