const bcrypt = require('bcrypt');
const User = require('../models/User');

const bcryptSaltRounds = 12;

/**
 * POST /auth/signup
 * 회원가입 처리
 *
 * Request (application/json):
 * {
 *   "username": "user1",
 *   "password": "pass123",
 *   "name": "테스트",
 *   "email": "user1@example.com"
 * }
 *
 * Responses:
 * 201 - { message: '회원가입 완료' }
 * 409 - { message: '이미 존재하는 아이디' }
 */
exports.signup = async (req, res) => {
  
  const { username, password, name, email } = req.body;
  //  SELECT * FROM users WHERE username = 'user1';
  const found = await User.findOne({ where: { username } });
  if (found) {
    return res.status(409).json({ message: '이미 존재하는 아이디' });
  }
  
  // 비밀번호 해싱
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);

  // INSERT INTO users (username, password, name, email) VALUES (...)
  // 데이터베이스에 비밀번호를 평문으로 저장하면 안 됨
  await User.create({ username, password: hashed, name, email });
  return res.status(201).json({ message: '회원가입 완료' });
};

exports.login = async (req, res) => {
};