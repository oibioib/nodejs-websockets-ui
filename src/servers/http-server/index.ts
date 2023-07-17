import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

import { STATIC_SERVER_PORT } from '@/config/servers';
import { log } from '@/lib/logger';

const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(''));
  const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

httpServer.listen(STATIC_SERVER_PORT, () => {
  log.httpServerMessage(`Static HTTP server is running on port: ${STATIC_SERVER_PORT}!`);
});

export default httpServer;
