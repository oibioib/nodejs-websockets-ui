import { DB } from '@/lib/db';
import { ExtendWebSocket } from '@/types';
import finish from './finish';

const closeWs = async (db: DB, ws: ExtendWebSocket) => {
  const { userIndex } = ws;

  const rooms = await db.getRoomByUserId(userIndex);

  await Promise.all(
    rooms.map(async (room) => {
      if (room.isClosed) return;

      const winner = room.roomUsers.find(({ index }) => index !== userIndex);

      if (winner) {
        const { name } = winner;
        await finish(db, room, name);
      }
    })
  );

  await db.removeWsClient(ws);
};

export default closeWs;
