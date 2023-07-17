import { log } from '@/lib/logger';
import { parseIncomingData } from '@/lib/message';
import { ControllerType } from '@/types';
import updateRoom from './updateRoom';
import createGame from './createGame';

type RoomDataType = {
  indexRoom: number;
};

const getRoomData = (roomData: unknown) => {
  try {
    const { indexRoom } = roomData as RoomDataType;
    if (!indexRoom) throw Error("Name isn't defined");
    if (typeof indexRoom !== 'number') throw Error("Room index isn't number");
    return { indexRoom };
  } catch {
    throw new Error('Incorrect room data');
  }
};

const addUserToTheRoom: ControllerType = async (db, incomingMessage, ws) => {
  try {
    if (!ws) return;

    const parsedData = parseIncomingData(incomingMessage.data);
    const { indexRoom } = getRoomData(parsedData);

    const room = await db.addUserToTheRoom(ws, indexRoom);

    if (room) {
      await createGame(db, room);
      await updateRoom(db);
    }

    if (!room) {
      log.infoMessage('Waiting for another user to join room.');
    }
  } catch (error) {
    log.serverErrorMessage(`UpdateRoomError. ${error.message}`);
  }
};

export default addUserToTheRoom;
