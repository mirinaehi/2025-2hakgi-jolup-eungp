const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 회원가입
router.post('/signup', authController.signup);

// 로그인 (JSON으로 token, username 반환)
router.post('/login', authController.login);


module.exports = router;