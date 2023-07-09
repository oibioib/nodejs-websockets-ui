import { WebSocket } from 'ws';

export type ExtendWebSocket = WebSocket & {
  id: string;
};

export type ClientType = {
  [key: string]: {
    ws: ExtendWebSocket;
  };
};

export type UserType = {
  id: number;
  username: string;
  password: string;
};
