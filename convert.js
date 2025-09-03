const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const puppeteer = require('puppeteer');

async function convertMdToPdf(markdownContent) {
    try {
        // 1. Parse Markdown to HTML
        const md = new MarkdownIt();
        const htmlContent = md.render(markdownContent);
        
        // 2. Add basic HTML structure and optional styling for better PDF output
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

        // 3. Launch a headless browser with Puppeteer
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        // 4. Set the page content to the generated HTML
        await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

        // 5. Generate the PDF as a buffer
        const pdfBuffer = await page.pdf({
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
        return pdfBuffer;

    } catch (error) {
        console.error('❌ An error occurred during PDF conversion:', error);
        throw error; // Re-throw to be handled by the caller
    }
}

module.exports = { convertMdToPdf };