import { messageRequiredFields } from '@/config/message';
import { DB } from '@/lib/db';
import { RawData, WebSocket } from 'ws';

export type ExtendWebSocket = WebSocket & {
  id: string;
};

// export type ClientsType = {
//   [key: string]: {
//     ws: ExtendWebSocket;
//   };
// };

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
  ws: ExtendWebSocket
) => Promise<void>;

export type WinnerType = {
  username: string;
  wins: number;
};
