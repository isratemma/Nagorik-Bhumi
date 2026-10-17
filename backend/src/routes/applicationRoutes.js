const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getApplications,
  getApplicationById,
  createApplication,
  reviewApplication,
  deleteApplication,
} = require('../controllers/applicationController');

// Public read
router.get('/',    getApplications);
router.get('/:id', getApplicationById);

// Protected write
router.post('/',            protect, createApplication);
router.patch('/:id/review', protect, authorize('admin', 'officer'), reviewApplication);
router.delete('/:id',       protect, authorize('admin'), deleteApplication);

module.exports = router;
