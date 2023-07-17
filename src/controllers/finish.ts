import { MESSAGE_TYPE } from '@/config/message';
import { DB } from '@/lib/db';
import { log } from '@/lib/logger';
import { sendResponseMessage } from '@/lib/message';
import { RoomType } from '@/types';
import updateWinners from './updateWinners';

const finish = async (db: DB, room: RoomType, winnerName: string) => {
  try {
    const winPlayer = await db.addWinner(winnerName);
    const clients = await db.getWsClientsByRoom(room);

    if (clients) {
      clients.forEach((ws) => {
        sendResponseMessage(MESSAGE_TYPE.FINISH, { winPlayer }, ws);
      });
    }

    await updateWinners(db);
  } catch (error) {
    log.serverErrorMessage(`FinishError. ${error.message}`);
  }
};

export default finish;
