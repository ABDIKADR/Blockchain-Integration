const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files
app.use(express.static(__dirname));

// Route for the demo page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Demo UI running at http://localhost:${PORT}`);
  console.log(`Make sure your API server is running at http://localhost:4000`);
}); 