import { v4 as newUUID } from 'uuid';
import { ClientType, ExtendWebSocket, UserType } from '@/types';

class DB {
  users: UserType[];
  _nextUserId: number;
  wsClients: ClientType;

  constructor() {
    this.users = [];
    this._nextUserId = 0;
    this.wsClients = {};
  }

  addWsClient(ws: ExtendWebSocket) {
    const id = newUUID();
    ws.id = id;
    this.wsClients[id] = { ws };
    return ws;
  }

  removeWsClient(wsToRemove: ExtendWebSocket) {
    delete this.wsClients[`${wsToRemove.id}`];
  }

  addUser(user: UserType) {
    return;
  }
}

export default DB;
