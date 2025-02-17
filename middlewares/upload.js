const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'byl-portfolio',
    allowedFormats: ['jpg', 'png', 'mp4'],
  },
});

const upload = multer({ storage });

module.exports = upload;
