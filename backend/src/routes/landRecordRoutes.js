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

// Public routes — no token needed (frontend not yet connected to auth)
router.get('/',    getLandRecords);
router.get('/:id', getLandRecordById);
router.post('/',   createLandRecord);
router.put('/:id', updateLandRecord);

// Admin/officer only
router.patch('/:id/status', protect, authorize('admin', 'officer'), updateStatus);
router.delete('/:id',       deleteLandRecord);   // public for now

module.exports = router;
