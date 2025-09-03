const express = require('express');
const path = require('path');
const { convertMdToPdf } = require('./convert'); // Import the conversion function
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Middleware to parse text bodies (for Markdown content)
app.use(express.text({ type: 'text/markdown' }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// New endpoint to handle Markdown to PDF conversion
app.post('/convert-to-pdf', async (req, res) => {
    try {
        const markdownContent = req.body;
        if (!markdownContent) {
            return res.status(400).send('No Markdown content provided.');
        }

        console.log('Received Markdown content for conversion.');
        const pdfBuffer = await convertMdToPdf(markdownContent);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="converted.pdf"');
        res.send(pdfBuffer);
        console.log('PDF sent successfully.');

    } catch (error) {
        console.error('Error during conversion endpoint:', error);
        res.status(500).send('Error converting Markdown to PDF.');
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});