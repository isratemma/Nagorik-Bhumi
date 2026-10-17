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

router.use(protect);

router.get('/',         getLandRecords);
router.post('/',        createLandRecord);
router.get('/:id',      getLandRecordById);
router.put('/:id',      updateLandRecord);
router.patch('/:id/status', authorize('admin', 'officer'), updateStatus);
router.delete('/:id',   authorize('admin'), deleteLandRecord);

module.exports = router;
