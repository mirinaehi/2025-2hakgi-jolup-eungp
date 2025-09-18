const Travel = require('../models/Travel');

const travelController = {

/**
 * GET /travels
 * 여행지 목록 조회
 */
  async getTravelList(req, res) {
    try {
      const travelList = await Travel.findAll();
      return res.json({ travelList });
    } catch (err) {
      console.error('getTravelList error:', err);
      return res.status(500).json({ message: '내부 서버 에러' });
    }
  },

  /**
 * POST /travels
 * 새로운 여행지 추가
 *
 * Request Headers:
 *   Authorization: Bearer <JWT 토큰>
 *
 * Request (application/json):
 * {
 *   "name": "일본"
 * }
 */
  async addTravel(req, res) {
    try {
      const { name } = req.body;
      // req.userId는 isAuth 미들웨어에서 세팅됨
      const created = await Travel.create({ name, userId: req.userId });
      return res.status(201).json({ message: 'created', id: created.id });
    } catch (err) {
      console.error('addTravel error:', err);
      return res.status(500).json({ message: '내부 서버 에러' });
    }
  },

  /**
 * PUT /travels/:id
 * 여행지 정보 수정
 *
 * Request Headers:
 *   Authorization: Bearer <JWT 토큰>
 *
 * Request (application/json):
 * {
 *   "name": "오사카"
 * }
 */
  async updateTravel(req, res) {
    try {
      const travelId = req.params.id;
      const { name } = req.body;
      // 여행지 존재 여부 확인
      const travel = await Travel.findByPk(travelId);
      if (!travel) return res.status(404).json({ message: '여행지를 찾을 수 없습니다.' });

      // 소유자 검사
      if (!req.userId || req.userId !== travel.userId) {
        return res.status(403).json({ message: '권한이 없습니다.' });
      }

      await travel.update({ name });
      return res.json({ message: 'updated', travel: { id: travel.id, name: travel.name } });
    } catch (err) {
      console.error('updateTravel error:', err);
      return res.status(500).json({ message: '내부 서버 에러' });
    }
  },


  /**
 * DELETE /travels/:id
 * 여행지 삭제
 *
 * Request Headers:
 *   Authorization: Bearer <JWT 토큰>
 */
  async deleteTravel(req, res) {
    try {
      const travelId = req.params.id;
      const travel = await Travel.findByPk(travelId);
      if (!travel) return res.status(404).json({ message: '여행지를 찾을 수 없습니다.' });

      if (!req.userId || req.userId !== travel.userId) {
        return res.status(403).json({ message: '권한이 없습니다.' });
      }

      await travel.destroy();
      return res.status(200).json({ message: 'deleted', id: travelId });
    } catch (err) {
      console.error('deleteTravel error:', err);
      return res.status(500).json({ message: '내부 서버 에러' });
    }
  },
};

module.exports = travelController;