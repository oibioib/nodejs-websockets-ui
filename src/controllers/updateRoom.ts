import { MESSAGE_TYPE } from '@/config/message';
import { DB } from '@/lib/db';
import { sendResponseMessageToAll } from '@/lib/message';
import { log } from '@/lib/logger';

const updateRoom = async (db: DB) => {
  try {
    const rooms = await db.getAvailableRooms();
    const clients = await db.getWsClient();
    sendResponseMessageToAll(MESSAGE_TYPE.UPDATE_ROOM, rooms, clients);
  } catch (error) {
    log.serverErrorMessage(`UpdateRoomError. ${error.message}`);
  }
};

export default updateRoom;
