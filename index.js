const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/index_files'));
app.use(express.json());
app.use(cookieParser());

app.post('/incrementTotalDownloads', (req, res) => {
    try {
        const filePath = __dirname + '/index_files/assets/TotalDownloads.txt';

        let currentDownloads = 0;
        let additionalNumber = 1;

        if (fs.existsSync(filePath)) {
            currentDownloads = parseInt(fs.readFileSync(filePath, 'utf-8')) || 0;
        }
        currentDownloads += additionalNumber;
        fs.writeFileSync(filePath, currentDownloads.toString(), 'utf-8');

        res.cookie('downloaded', 0, { maxAge: 0, httpOnly: true });

        res.status(200).send('Total downloads incremented successfully.');
    } catch (error) {
        console.error('Error incrementing total downloads:', error);
        res.status(500).send('Internal server error.');
    }
});

app.get('/getTotalDownloads', (req, res) => {
    try {
        const filePath = __dirname + '/index_files/assets/TotalDownloads.txt';

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            res.status(200).send(fileContent);
        } else {
            res.status(404).send('TotalDownloads.txt not found.');
        }
    } catch (error) {
        console.error('Error getting total downloads:', error);
        res.status(500).send('Internal server error.');
    }
});

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/404.html');
});

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Server shutting down...');
    server.close(() => {
        process.exit(0);
    });
});

// Expose the app for PM2
module.exports = app;
