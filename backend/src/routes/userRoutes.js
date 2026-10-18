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

// Public read (no token for now — protect after auth is wired)
router.get('/',    getAllUsers);
router.get('/:id', getUserById);

// Protected write
router.put('/:id',          protect, authorize('admin'), updateUser);
router.patch('/:id/status', protect, authorize('admin'), toggleUserStatus);
router.delete('/:id',       protect, authorize('admin'), deleteUser);

module.exports = router;
