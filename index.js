const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the directory where uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Set the filename to be the original file name
    cb(null, file.originalname);
  }
});

// Create a multer instance with the configured storage
const upload = multer({ storage: storage });

// Serve the index.html file as the default page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set up a route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    // File was uploaded successfully
    res.json({ message: 'File uploaded successfully' });
  } else {
    // No file was selected
    res.status(400).json({ error: 'No file selected' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
