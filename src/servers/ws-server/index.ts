import { WebSocketServer } from 'ws';
import { WS_SERVER_PORT } from '@/config/servers';
import log from '@/lib/logger';
import { DB } from '@/lib/db';
import { ExtendWebSocket } from '@/types';
import { controller } from '@/controller';

const db = new DB();

const webSocketServer = new WebSocketServer({ port: WS_SERVER_PORT });

webSocketServer.on('listening', () =>
  log.webSocketServerMessage(`WebSocketServer is running on port: ${WS_SERVER_PORT}!`)
);

webSocketServer.on('error ', (error) => {
  log.serverErrorMessage(`Error. ${error.message}`);
});

webSocketServer.on('close', () => {
  log.webSocketServerMessage(`WebSocketServer close!`);
});

webSocketServer.on('connection', (ws: ExtendWebSocket) => {
  db.addWsClient(ws);

  log.clientMessage(`Client connected. Socket ID: ${ws.id}`);

  ws.on('close', () => {
    db.removeWsClient(ws);
  });

  ws.on('message', (message) => {
    log.webSocketServerIncomingMessage(ws.id, message.toString());
    controller(message);
  });
});

export default webSocketServer;
