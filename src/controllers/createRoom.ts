import { ControllerType } from '@/types/types';
import { log } from '@/lib/logger';
import updateRoom from './updateRoom';

const createRoom: ControllerType = async (db, _incomingMessage, ws) => {
  try {
    const room = await db.addRoom(ws);

    if (room) {
      await updateRoom(db);
    }

    if (!room) {
      log.infoMessage('User already create a room.');
    }
  } catch (error) {
    log.serverErrorMessage(`CreateRoomError. ${error.message}`);
  }
};

export default createRoom;
