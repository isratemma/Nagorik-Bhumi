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

router.use(protect);

router.get('/',       getApplications);
router.post('/',      createApplication);
router.get('/:id',    getApplicationById);
router.patch('/:id/review', authorize('admin', 'officer'), reviewApplication);
router.delete('/:id', authorize('admin'), deleteApplication);

module.exports = router;
