const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');
const { isAuth } = require('../middleware/auth');

// 여행지 목록
router.get('/', travelController.getTravelList);

// 여행지 추가
router.post('/', isAuth, travelController.addTravel);

// 여행지 수정
router.put('/:id', isAuth, travelController.updateTravel);

// 여행지 삭제
router.delete('/:id', isAuth, travelController.deleteTravel);

module.exports = router;
