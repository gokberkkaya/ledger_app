const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

router.post('/give-credit', balanceController.giveCreditToUser);
router.get('/all', balanceController.getAllUserBalances);
router.get('/balance/:username', balanceController.getBalanceByUsername);
router.get('/balance/:username/:timestamp', balanceController.getBalanceAtTime);

module.exports = router;
