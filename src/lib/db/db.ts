import { v4 as newUUID } from 'uuid';
import { ClientsType, ExtendWebSocket, UserType, WinnerType } from '@/types';

class DB {
  wsClients: ClientsType;
  users: UserType[];
  _nextUserIndex: number;
  winners: WinnerType[];

  constructor() {
    this.wsClients = new Map();
    this.users = [];
    this._nextUserIndex = 0;
    this.winners = [{ username: 'Pasha', wins: 20 }];
  }

  getWsClient() {
    return this.wsClients;
  }

  addWsClient(ws: ExtendWebSocket) {
    const id = newUUID();
    ws.id = id;
    this.wsClients.set(ws, undefined);
    return ws;
  }

  removeWsClient(ws: ExtendWebSocket) {
    this.wsClients.delete(ws);
  }

  addUser(usernameToAdd: string, password: string) {
    const newUser: UserType = {
      index: this._nextUserIndex,
      username: usernameToAdd,
      password,
    };

    this._nextUserIndex = this._nextUserIndex + 1;
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }

  findUserByUsername(usernameToFind: string) {
    const user = this.users.find(({ username }) => usernameToFind === username);
    return Promise.resolve(user);
  }

  getWinners() {
    const winners = this.winners;
    return Promise.resolve(winners);
  }
}

export default DB;
