import { RoomType } from '@/types';
import { log } from '@/lib/logger';
import { DB } from '@/lib/db';
import { sendResponseMessage } from '@/lib/message';
import { MESSAGE_TYPE } from '@/config/message';

type CreateGameType = (db: DB, room: RoomType) => Promise<void>;

const createGame: CreateGameType = async (db, room) => {
  try {
    const clients = await db.getWsClientsByRoom(room);

    if (clients) {
      clients.forEach((ws) => {
        const gameData = {
          idGame: room.roomId,
          idPlayer: ws.userIndex,
        };

        room.isGameAvailableToJoin = false;
        sendResponseMessage(MESSAGE_TYPE.CREATE_GAME, gameData, ws);
      });
    }
  } catch (error) {
    log.serverErrorMessage(`CreateGameError. ${error.message}`);
  }
};

export default createGame;
