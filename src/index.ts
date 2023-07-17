import { log } from '@/lib/logger';
import { webSocketServer, httpServer } from '@/servers';

log.welcomeMessage();

process.on('SIGINT', () => {
  webSocketServer.clients.forEach((client) => client.close());
  webSocketServer.close();
  httpServer.close();
  setTimeout(() => process.exit(0), 1000);
});
