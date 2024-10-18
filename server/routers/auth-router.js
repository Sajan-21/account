const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

router.patch('/otp-verification',authController.otpVerification);

module.exports = router;