const express = require('express');
const router = express.Router();
const {
  toggleSaveJob,
  getSavedJobs,
  removeSavedJob,
} = require('../controllers/savedJobController');
const { protect } = require('../middleware/authMiddleware');

router.post('/toggle', protect, toggleSaveJob);
router.get('/', protect, getSavedJobs);
router.delete('/:jobId', protect, removeSavedJob);

module.exports = router;
