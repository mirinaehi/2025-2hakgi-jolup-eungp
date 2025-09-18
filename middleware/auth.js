const jwt = require('jsonwebtoken');
const jwtSecretKey = '일단은 아무렇게나 입력';


function isAuth(req, res, next) {
  // Authorization 헤더 값을 가져옴
  const authHeader = req.get('Authorization');
  // Bearer: 토큰을 소지한 자(인증된 사용자)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    // 토큰을 유효한지 검증하고 사용자 정보(payload)를 가져옴
    const decoded = jwt.verify(token, jwtSecretKey);

    // 요청 객체에 사용자 ID와 토큰 저장 (다음 미들웨어/라우트에서 활용 가능)
    req.userId = decoded.id;
    req.token = token;
    
    // 현재 미들웨어를 끝내고, 다음 미들웨어나 라우트 핸들러로 요청을 넘김
    next();
  } catch {
    return res.status(401).json({ message: '유효하지 않은 토큰' });
  }
}

module.exports = { isAuth };
