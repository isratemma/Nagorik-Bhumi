const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const { protect, authorize } = require('../middleware/auth');
const {
  getDocuments,
  uploadDocument,
  verifyDocument,
  deleteDocument,
} = require('../controllers/documentController');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /pdf|jpg|jpeg|png/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) return cb(null, true);
  cb(new Error('Only PDF, JPG and PNG files are allowed'));
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter,
});

router.use(protect);

router.get('/',             getDocuments);
router.post('/upload',      upload.single('file'), uploadDocument); // public for now
router.patch('/:id/verify', protect, authorize('admin', 'officer'), verifyDocument);
router.delete('/:id',       protect, deleteDocument);

module.exports = router;
