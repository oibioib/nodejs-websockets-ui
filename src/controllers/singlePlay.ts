import { ControllerType } from '@/types';
import createGame from './createGame';
import updateWinners from './updateWinners';

const singlePlay: ControllerType = async (db, _incomingMessage, ws) => {
  if (!ws) return;

  await updateWinners(db);

  const room = await db.addRoom(ws);

  if (room) {
    const { roomId } = room;
    await createGame(db, room);
    await db.addBotToRoom(roomId);
  }
};

export default singlePlay;
