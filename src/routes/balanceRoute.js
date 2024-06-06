const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

router.post('/give-credit', balanceController.giveCreditToUser);
router.get('/all', balanceController.getAllUserBalances);
router.get('/:username', balanceController.getBalanceByUsername);

module.exports = router;
