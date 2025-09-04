# ซอร์สโค้ดนี้ ใช้สำหรับเป็นตัวอย่างเท่านั้น ถ้านำไปใช้งานจริง ผู้ใช้ต้องจัดการเรื่องความปลอดภัย และ ประสิทธิภาพด้วยตัวเอง

# Markdown to PDF Converter

This project provides a simple web application to convert Markdown files into PDF documents. Users can drag and drop Markdown files onto the web interface, and the application will process them on the server-side, generating and downloading a PDF version.

## Features

*   **Drag-and-Drop Interface**: Easily upload Markdown files by dragging them into the designated area (or click to browse your files).
*   **Client-Side File Handling**: Reads Markdown file content directly in the browser.
*   **Server-Side PDF Conversion**: Utilizes Node.js, `markdown-it`, and `puppeteer` to convert Markdown to HTML and then to PDF.
*   **Dynamic Progress Bar**: Shows upload progress during the conversion process.
*   **Themed UI**: A "Superman" themed user interface with Tailwind CSS and custom animations.

## Technologies Used

*   **Frontend**:
    *   HTML5
    *   Tailwind CSS (for styling)
    *   Feather Icons (for vector icons)
    *   Anime.js (for animations)
    *   JavaScript (for client-side logic, file handling, and API calls)
*   **Backend**:
    *   Node.js
    *   Express.js (for the web server and API)
    *   `markdown-it` (for parsing Markdown to HTML)
    *   `puppeteer` (for headless browser PDF generation)

## Getting Started

To set up and run this project locally, follow these steps:

### Prerequisites

Ensure you have Node.js and npm (Node Package Manager) installed on your system.

*   [Node.js](https://nodejs.org/en/download/) (includes npm)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd md-2-pdf
    ```
    (Replace `[repository-url]` with the actual URL of your repository)

2.  **Install dependencies**:
    Navigate to the project directory and install the required Node.js packages:
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the server**:
    ```bash
    npm start
    or
    node index.js
    ```
    The server will start on `http://localhost:3000`.

2.  **Open in browser**:
    Open your web browser and navigate to `http://localhost:3000`.

3.  **Convert a Markdown file**:
    Drag and drop a (or click it if can't drop file) `.md` file into the upload area, or click to select one. The application will convert it to PDF and prompt you to download the generated PDF.

## Project Structure

*   `index.html`: The main frontend HTML file, containing the user interface and client-side JavaScript.
*   `index.js`: The backend server entry point, handling static file serving and the PDF conversion API endpoint.
*   `convert.js`: Contains the core logic for Markdown to PDF conversion using `markdown-it` and `puppeteer`.
*   `package.json`: Defines project metadata and lists dependencies.
*   `README.md`: This file, providing an overview of the project.
