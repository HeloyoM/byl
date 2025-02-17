const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ url: req.file.path });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
