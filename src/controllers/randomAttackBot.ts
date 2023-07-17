import { BOARD_SIZE, BOT_INDEX } from '@/config/board';
import { MESSAGE_TYPE } from '@/config/message';
import { log } from '@/lib/logger';
import { DB } from '@/lib/db';
import { indexToXY } from '@/lib/board';
import { getRandomAttackIndex } from '@/lib/random';
import attack from './attack';

const randomAttackBot = async (db: DB, gameId: number) => {
  try {
    const room = await db.getRoomByID(gameId);
    const indexPlayer = BOT_INDEX;

    if (room) {
      const { nextTurn } = room;

      if (nextTurn !== indexPlayer) return;

      const opponentId = Object.keys(room.game).find((id) => +id !== indexPlayer);

      if (!opponentId) return;

      const { attacked } = room.game[opponentId];
      const randomIndex = getRandomAttackIndex(attacked, BOARD_SIZE ** 2 - 1);
      const { x, y } = indexToXY(randomIndex, BOARD_SIZE);
      const data = JSON.stringify({ indexPlayer, gameId, x, y });

      await attack(db, { type: MESSAGE_TYPE.RANDOM_ATTACK, data }, undefined);

      log.infoMessage(`Bot attack x: ${x}, y: ${y}`);
    }
  } catch (error) {
    log.serverErrorMessage(`RandomAttackBotError. ${error.message}`);
  }
};

export default randomAttackBot;
