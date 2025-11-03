const http = require('http');

const PORT = 8080;
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'inventory-api' }));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Inventory API running\n');
  }
});

server.listen(PORT, () => {
  console.log(`inventory-api listening on port ${PORT}`);
});
// minor change for pipeline demo
