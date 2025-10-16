const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');

router.post('/run', botController.runBotMimic);

router.get('/logs', botController.getAllLogs);

module.exports = router;
