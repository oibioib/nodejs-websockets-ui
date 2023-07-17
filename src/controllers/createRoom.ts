import { log } from '@/lib/logger';
import { ControllerType } from '@/types';
import updateRoom from './updateRoom';

const createRoom: ControllerType = async (db, _incomingMessage, ws) => {
  try {
    if (!ws) return;

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
