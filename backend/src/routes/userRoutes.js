const express = require('express');
const router  = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllUsers,
  getUserById,
  updateUser,
  toggleUserStatus,
  deleteUser,
} = require('../controllers/userController');

// All routes require login + admin role
router.use(protect, authorize('admin'));

router.get('/',           getAllUsers);
router.get('/:id',        getUserById);
router.put('/:id',        updateUser);
router.patch('/:id/status', toggleUserStatus);
router.delete('/:id',     deleteUser);

module.exports = router;
