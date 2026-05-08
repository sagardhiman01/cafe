const express = require('express');
const path = require('path');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '.')));

// Send index.html for any request
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Self-ping mechanism to keep Render awake
const URL = process.env.RENDER_EXTERNAL_URL;
if (URL) {
    setInterval(() => {
        https.get(URL, (res) => {
            console.log(`Self-ping to ${URL} successful: Status Code ${res.statusCode}`);
        }).on('error', (err) => {
            console.error(`Self-ping to ${URL} failed: ${err.message}`);
        });
    }, 600000); // 10 minutes
    console.log(`Self-ping initialized for: ${URL}`);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
