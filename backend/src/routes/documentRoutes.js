const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const { protect, authorize } = require('../middleware/auth');
const {
  getDocuments,
  uploadDocument,
  verifyDocument,
  deleteDocument,
} = require('../controllers/documentController');

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename:    (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /pdf|jpg|jpeg|png/i;
  const ext  = allowed.test(path.extname(file.originalname));
  const mime = /pdf|jpeg|jpg|png/i.test(file.mimetype);
  if (ext && mime) return cb(null, true);
  cb(new Error('Only PDF, JPG and PNG files are allowed'));
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter,
});

// ── Public routes (no token required) ────────────────────────
router.get('/',          getDocuments);
router.post('/upload',   upload.single('file'), uploadDocument);

// ── Protected routes ──────────────────────────────────────────
router.patch('/:id/verify',  protect, authorize('admin', 'officer'), verifyDocument);
router.delete('/:id',        protect, deleteDocument);

module.exports = router;
