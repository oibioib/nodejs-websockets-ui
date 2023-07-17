import { messageRequiredFields } from '@/config/message';
import { DB } from '@/lib/db';
import { RawData, WebSocket } from 'ws';

export type ExtendWebSocket = WebSocket & {
  id: string;
  userIndex: number;
  userName: string;
};

export type ClientsType = Map<ExtendWebSocket, undefined>;

export type UserType = {
  index: number;
  username: string;
  password: string;
};

export type KeyType = (typeof messageRequiredFields)[number];

export type ParsedIncomingMessageType = {
  [key in KeyType]: string;
};

export type ParseIncomingMessageType = (incomingMessage: RawData) => ParsedIncomingMessageType;

export type RouteType = {
  command: string;
  controller: ControllerType;
};

export type RouterType = (incomingMessage: RawData, ws: ExtendWebSocket, db: DB) => void;

export type ControllerType = (
  db: DB,
  incomingMessage: ParsedIncomingMessageType,
  ws: ExtendWebSocket | undefined
) => Promise<void>;

export type WinnerType = {
  name: string;
  wins: number;
};

export type RoomUserType = {
  name: string;
  index: number;
};

export type BoardShipType = {
  ship: number[];
  aroundShip: number[];
};

export type BoardType = {
  ships: BoardShipType[];
  attacked: number[];
};

type GameType = {
  [key: string]: BoardType;
};

export type ShipType = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  type: string;
  length: number;
};

export type GameDataType = {
  gameId: number;
  ships: ShipType[];
  indexPlayer: number;
};

type IncomingDataType = {
  [key: string]: GameDataType;
};

export type RoomType = {
  roomId: number;
  roomUsers: RoomUserType[];
  roomCreatorIndex: number;
  nextTurn: number;
  isGameAvailableToJoin: boolean;
  game: GameType;
  data: IncomingDataType;
};
