import { BOARD_SIZE } from '@/config/board';
import { log } from '@/lib/logger';
import { parseIncomingData } from '@/lib/message';
import { XYToIndex, getIndexAround } from '@/lib/board';
import { BoardType, ControllerType, GameDataType, ShipType } from '@/types';
import startGame from './startGame';
import turn from './turn';

const createBoard = (ships: ShipType[]) => {
  const board: BoardType = {
    ships: [],
    attacked: [],
  };

  ships.forEach((ship) => {
    const {
      position: { x, y },
      direction,
      length,
    } = ship;

    const shipIndexes: number[] = [];
    const aroundShipIndexes: number[] = [];
    const firstIndex = XYToIndex(x, y, BOARD_SIZE);

    shipIndexes.push(firstIndex);

    if (direction) {
      for (let i = 1; i < length; i++) {
        shipIndexes.push(firstIndex + BOARD_SIZE * i);
      }
    }

    if (!direction) {
      for (let i = 1; i < length; i++) {
        shipIndexes.push(firstIndex + i);
      }
    }

    shipIndexes.forEach((cell) => {
      aroundShipIndexes.push(...getIndexAround(cell, BOARD_SIZE));
    });

    const unique = [...new Set(aroundShipIndexes)].filter((index) => !shipIndexes.includes(index));

    board.ships.push({
      ship: shipIndexes,
      aroundShip: unique,
    });
  });

  return board;
};

const addShips: ControllerType = async (db, incomingMessage, ws) => {
  try {
    if (!ws) return;

    const parsedData = parseIncomingData(incomingMessage.data) as GameDataType;
    const { ships, gameId } = parsedData;
    const { userIndex } = ws;

    const board = createBoard(ships);

    const room = await db.getRoomByID(gameId);

    if (!room) {
      log.serverErrorMessage('AddShipsError. Room not found');
      return;
    }

    const roomWithBoard = await db.addRoomBoardByUserIndex(gameId, userIndex, board, parsedData);

    if (!roomWithBoard) {
      log.serverErrorMessage('AddShipsError. Room not found');
      return;
    }

    if (roomWithBoard && Object.keys(roomWithBoard.game).length === 2) {
      await startGame(db, roomWithBoard);
      await turn(db, roomWithBoard);
    }
  } catch (error) {
    log.serverErrorMessage(`AddShipsError. ${error.message}`);
  }
};

export default addShips;
