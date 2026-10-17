const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getLandTaxes,
  getLandTaxById,
  createLandTax,
  payLandTax,
} = require('../controllers/landTaxController');

router.use(protect);

router.get('/',           getLandTaxes);
router.post('/',          authorize('admin'), createLandTax);
router.get('/:id',        getLandTaxById);
router.patch('/:id/pay',  payLandTax);

module.exports = router;
