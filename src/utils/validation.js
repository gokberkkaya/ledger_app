const isValidUsername = (username) => {
    return /^[a-zA-Z0-9]+$/.test(username);
};

module.exports = { isValidUsername };