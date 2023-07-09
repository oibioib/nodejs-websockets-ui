import { MESSAGE_TYPE } from '@/config/message';
import { DB } from '@/lib/db';
import { sendResponseMessageToAll } from '@/lib/message';
import log from '@/lib/logger';

const updateWinners = async (db: DB) => {
  try {
    const winners = await db.getWinners();
    const clients = db.getWsClient();
    sendResponseMessageToAll(MESSAGE_TYPE.UPDATE_WINNERS, winners, clients);
  } catch (error) {
    log.serverErrorMessage(`UpdateWinnersError. ${error.message}`);
  }
};

export default updateWinners;
