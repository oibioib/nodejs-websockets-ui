import { MESSAGE_TYPE } from '@/config/message';
import { DB } from '@/lib/db';
import { log } from '@/lib/logger';
import { sendResponseMessage } from '@/lib/message';
import { RoomType } from '@/types';

type StartGameType = (db: DB, room: RoomType) => Promise<void>;

const startGame: StartGameType = async (db, room) => {
  try {
    const clients = await db.getWsClientsByRoom(room);

    if (clients) {
      clients.forEach(async (ws) => {
        const { userIndex } = ws;
        const gameData = room.data[userIndex];
        sendResponseMessage(MESSAGE_TYPE.START_GAME, gameData, ws);
      });
    }
  } catch (error) {
    log.serverErrorMessage(`StartGameError. ${error.message}`);
  }
};

export default startGame;
