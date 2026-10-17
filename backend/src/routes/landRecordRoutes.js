const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getLandRecords,
  getLandRecordById,
  createLandRecord,
  updateLandRecord,
  updateStatus,
  deleteLandRecord,
} = require('../controllers/landRecordController');

// Public read routes (no token needed)
router.get('/',    getLandRecords);
router.get('/:id', getLandRecordById);

// Protected write routes
router.post('/',            protect, createLandRecord);
router.put('/:id',          protect, updateLandRecord);
router.patch('/:id/status', protect, authorize('admin', 'officer'), updateStatus);
router.delete('/:id',       protect, authorize('admin'), deleteLandRecord);

module.exports = router;
