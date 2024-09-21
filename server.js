import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Pour remplacer __dirname dans les ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
    const filePath = req.url === '/' ? '/example/index.html' : req.url;
    const ext = path.extname(filePath);
    let contentType = 'text/html';
  
    // Map des types MIME en fonction de l'extension
    switch (ext) {
      case '.js':
        contentType = 'application/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
      default:
        contentType = 'text/html';
    }
  
    const fullPath = path.join(__dirname, '', filePath);
  
    // Vérifier si le fichier existe
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        // Si le fichier n'existe pas, servir index.html (pour une route SPA)
        const indexPath = path.join(__dirname, 'example/index.html');
        fs.readFile(indexPath, (errIndex, indexData) => {
          if (errIndex) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexData);
          }
        });
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  });
  
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur HTTP lancé sur le port ${PORT}`);
});