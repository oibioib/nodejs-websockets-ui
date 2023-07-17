import { MESSAGE_TYPE } from '@/config/message';
import { DB } from '@/lib/db';
import { log } from '@/lib/logger';
import { sendResponseMessage } from '@/lib/message';
import { RoomType } from '@/types';

type TurnType = (db: DB, room: RoomType) => Promise<void>;

const turn: TurnType = async (db, room) => {
  try {
    const clients = await db.getWsClientsByRoom(room);

    if (clients) {
      clients.forEach((ws) => {
        const gameData = {
          currentPlayer: room.nextTurn,
        };
        sendResponseMessage(MESSAGE_TYPE.TURN, gameData, ws);
      });
    }
  } catch (error) {
    log.serverErrorMessage(`TurnError. ${error.message}`);
  }
};

export default turn;
