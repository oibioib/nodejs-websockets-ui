import { v4 as newUUID } from 'uuid';
import { ClientType, ExtendWebSocket, UserType } from '@/types';

class DB {
  wsClients: ClientType;
  users: UserType[];
  _nextUserIndex: number;

  constructor() {
    this.users = [];
    this._nextUserIndex = 0;
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

  addUser(usernameToAdd: string, password: string) {
    const newUser: UserType = {
      index: this._nextUserIndex,
      username: usernameToAdd,
      password,
    };

    this._nextUserIndex = this._nextUserIndex + 1;
    this.users.push(newUser);
    return newUser;
  }

  findUserByUsername(usernameToFind: string) {
    return this.users.find(({ username }) => usernameToFind === username);
  }
}

export default DB;
