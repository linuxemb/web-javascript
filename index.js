const express = require('express');
const multer = require('multer');
const path = require('path');
const {exec} = require('child_process');  // for executing shell commands
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

/*
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
*/


// Set up a route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
      const uploadedFileName = req.file.filename;
  
      // Run whisper.exe with the uploaded file name as a parameter
      const command = `C:\\Users\\lisa.shi\\Downloads\\WhisperDesktop.exe -m C:\\Users\\lisa.shi\\Downloads\\ggml-medium.bin -f  ${uploadedFileName}`;
      
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          res.status(500).json({ error: 'Failed to execute whisper.exe' });
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        
        // Handle the output or result of whisper.exe as needed
        
        res.json({ message: 'File uploaded and whisper.exe executed successfully' });
      });
    } else {
      // No file was selected
      res.status(400).json({ error: 'No file selected' });
    }
  });





// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
