import { parseIncomingMessage } from '@/lib/message';
import { log } from '@/lib/logger';
import routes from './routes';
import { RouterType } from '@/types';

const router: RouterType = (incomingMessage, ws, db) => {
  try {
    const message = parseIncomingMessage(incomingMessage);
    const route = routes.find(({ command }) => command === message.type);

    if (route) route.controller(db, message, ws);

    if (!route) throw Error(`Unknown message type "${message.type}".`);
  } catch (error) {
    log.serverErrorMessage(`RouterError. ${error.message}`);
  }
};

export default router;
