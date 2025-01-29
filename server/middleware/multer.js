const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    // Generate unique file name using Date.now() and the file's original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

module.exports = upload; // Export the multer instance for use in routes
