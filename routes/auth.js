const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuth } = require('../middleware/auth');

// 회원가입
router.post('/signup', authController.signup);

// 로그인 (JSON으로 token, username 반환)
router.post('/login', authController.login);

// 로그인한 유저 정보 조회 (토큰 필요)
router.get('/me', isAuth, authController.me);

module.exports = router;