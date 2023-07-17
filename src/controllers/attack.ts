import { ATTACK_STATUS, BOARD_SIZE } from '@/config/board';
import { MESSAGE_TYPE } from '@/config/message';
import { XYToIndex, indexToXY } from '@/lib/board';
import { log } from '@/lib/logger';
import { parseIncomingData, sendResponseMessage } from '@/lib/message';
import { ControllerType } from '@/types';
import turn from './turn';
import finish from './finish';

type AttackDataType = {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
};

const createAttackData = (x: number, y: number, currentPlayer: number, status: string) => ({
  position: {
    x,
    y,
  },
  currentPlayer,
  status,
});

const attack: ControllerType = async (db, incomingMessage, ws) => {
  try {
    const parsedData = parseIncomingData(incomingMessage.data) as AttackDataType;
    const { indexPlayer, gameId, x, y } = parsedData;

    const room = await db.getRoomByID(gameId);

    if (room) {
      const { nextTurn } = room;

      if (nextTurn !== indexPlayer) return;

      const opponentId = Object.keys(room.game).find((id) => +id !== indexPlayer);

      if (!opponentId) return;

      const opponentGameData = room.game[opponentId];
      const shipIndex = XYToIndex(x, y, BOARD_SIZE);

      const alreadyAttacked = await db.getAttacked(gameId, opponentId);

      if (alreadyAttacked.includes(shipIndex)) {
        await turn(db, room);
        return;
      }

      const allAttacked = await db.addAttacked(gameId, opponentId, shipIndex);

      const targetShip = opponentGameData.ships.find((item) => {
        return item.ship.includes(shipIndex);
      });

      if (targetShip) {
        const isShipKilled = targetShip.ship.every((index) => {
          return allAttacked.includes(index);
        });

        if (isShipKilled) {
          const data = createAttackData(x, y, indexPlayer, ATTACK_STATUS.KILLED);
          sendResponseMessage(MESSAGE_TYPE.ATTACK, data, ws);
          const { aroundShip } = targetShip;

          aroundShip.forEach((cell) => {
            const { x, y } = indexToXY(cell, BOARD_SIZE);
            const data = createAttackData(x, y, indexPlayer, ATTACK_STATUS.MISS);
            sendResponseMessage(MESSAGE_TYPE.ATTACK, data, ws);
          });

          await db.addAttacked(gameId, opponentId, ...aroundShip);
        }

        if (!isShipKilled) {
          const data = createAttackData(x, y, indexPlayer, ATTACK_STATUS.SHOT);
          sendResponseMessage(MESSAGE_TYPE.ATTACK, data, ws);
        }

        const winner = await db.checkWinner(gameId);

        if (winner) {
          await finish(db, room, winner);
        } else {
          await turn(db, room);
        }
      }

      if (!targetShip) {
        const data = createAttackData(x, y, indexPlayer, ATTACK_STATUS.MISS);
        sendResponseMessage(MESSAGE_TYPE.ATTACK, data, ws);
        await db.changeNextTurn(gameId, +opponentId);
        await turn(db, room);
      }
    }

    if (!room) return;
  } catch (error) {
    log.serverErrorMessage(`AttackError. ${error.message}`);
  }
};

export default attack;
