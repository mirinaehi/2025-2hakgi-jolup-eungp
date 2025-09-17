const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const bcryptSaltRounds = 12;


const jwtSecretKey = '일단은 아무렇게나 입력';
const jwtExpiresInDays = '2d';

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

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


/**
 * POST /auth/login
 * 로그인 처리
 *
 * Request (application/json):
 * {
 *   "username": "user1",
 *   "password": "pass123"
 * }
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user)
    return res.status(401).json({ message: '존재하지 않는 ID' });

  // DB에 저장된 해시된 비밀번호와 로그인 시 사용자가 입력한 비밀번호를 비교
  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
  
  // user.id를 JWT 토큰의 페이로드에 넣어 서명
  const token = createJwtToken(user.id);
  return res.status(200).json({ token, username });
};