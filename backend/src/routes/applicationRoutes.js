const express = require('express');
const router  = express.Router();
const {
  getApplications,
  getApplicationById,
  createApplication,
  reviewApplication,
  deleteApplication,
} = require('../controllers/applicationController');

// All public for now — add auth after frontend JWT is wired
router.get('/',             getApplications);
router.get('/:id',          getApplicationById);
router.post('/',            createApplication);
router.patch('/:id/review', reviewApplication);   // approve / reject
router.delete('/:id',       deleteApplication);

module.exports = router;
