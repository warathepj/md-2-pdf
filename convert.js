const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const puppeteer = require('puppeteer');

async function convertMdToPdf(mdFilePath, pdfOutputPath) {
    try {
        // 1. Read the Markdown file content
        const markdownContent = fs.readFileSync(mdFilePath, 'utf-8');

        // 2. Parse Markdown to HTML
        const md = new MarkdownIt();
        const htmlContent = md.render(markdownContent);
        
        // 3. Add basic HTML structure and optional styling for better PDF output
        const fullHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: sans-serif; margin: 40px; }
                    h1 { color: #333; }
                    pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; }
                </style>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>
        `;

        // 4. Launch a headless browser with Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // 5. Set the page content to the generated HTML
        await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

        // 6. Generate the PDF
        await page.pdf({
            path: pdfOutputPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            }
        });

        await browser.close();

        console.log(`✅ Successfully converted ${mdFilePath} to ${pdfOutputPath}`);

    } catch (error) {
        console.error('❌ An error occurred:', error);
    }
}

// Example usage:
const mdFile = 'example.md'; // Name of your markdown file
const pdfFile = 'output.pdf';  // Desired output PDF file name

// Get the absolute path to your files
const mdFilePath = path.join(__dirname, mdFile);
const pdfOutputPath = path.join(__dirname, pdfFile);

convertMdToPdf(mdFilePath, pdfOutputPath);