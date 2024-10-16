const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller')

router.post('/sendOtp',authController.otp);

module.exports = router;