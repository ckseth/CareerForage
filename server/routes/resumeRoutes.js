const express = require('express');
const router = express.Router();
const { getMyResumes, createOrUpdateResume, analyzeResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', analyzeResume);
router.get('/my', protect, getMyResumes);
router.post('/', protect, createOrUpdateResume);

module.exports = router;
