import { BOARD_SIZE } from '@/config/board';
import { MESSAGE_TYPE } from '@/config/message';
import { log } from '@/lib/logger';
import { parseIncomingData } from '@/lib/message';
import { indexToXY } from '@/lib/board';
import { getRandomAttackIndex } from '@/lib/random';
import { ControllerType } from '@/types';
import attack from './attack';

type RandomAttackDataType = {
  gameId: number;
  indexPlayer: number;
};

const randomAttack: ControllerType = async (db, incomingMessage, ws) => {
  try {
    const parsedData = parseIncomingData(incomingMessage.data) as RandomAttackDataType;
    const { indexPlayer, gameId } = parsedData;

    const room = await db.getRoomByID(gameId);

    if (room) {
      const { nextTurn } = room;

      if (nextTurn !== indexPlayer) return;

      const opponentId = Object.keys(room.game).find((id) => +id !== indexPlayer);

      if (!opponentId) return;

      const { attacked } = room.game[opponentId];
      const randomIndex = getRandomAttackIndex(attacked, BOARD_SIZE ** 2 - 1);
      const { x, y } = indexToXY(randomIndex, BOARD_SIZE);
      const data = JSON.stringify({ indexPlayer, gameId, x, y });

      await attack(db, { type: MESSAGE_TYPE.RANDOM_ATTACK, data }, ws);
    }
  } catch (error) {
    log.serverErrorMessage(`RandomAttackError. ${error.message}`);
  }
};

export default randomAttack;
