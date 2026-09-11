/* Servidor estático sem dependências — só precisa do Node.
   Uso:  node dev-server.js        (ou: npm start)
   Abre em http://localhost:5173 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'site');
const PORT = Number(process.env.PORT) || 5173;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end('Bad request');
    return;
  }

  if (pathname.endsWith('/')) pathname += 'index.html';

  // impede sair da pasta do site
  const filePath = path.join(ROOT, path.normalize(pathname));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404</h1><p>Não encontrado: ' + pathname + '</p>');
      return;
    }
    const type = TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-store, must-revalidate'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  Avanti rodando em  ->  http://localhost:' + PORT);
  console.log('  Pasta servida:         ' + ROOT);
  console.log('  Ctrl+C para parar.');
  console.log('');
});
