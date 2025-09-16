const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');

// 여행지 목록
router.get('/', travelController.getTravelList);

// 여행지 추가
router.post('/', travelController.addTravel);

// 여행지 수정
router.put('/:id', travelController.updateTravel);

// 여행지 삭제
router.delete('/:id', travelController.deleteTravel);

module.exports = router;
