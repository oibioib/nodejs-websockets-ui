import { MESSAGE_TYPE } from '@/config/message';
import {
  addUserToTheRoom,
  createRoom,
  regUser,
  addShips,
  attack,
  randomAttack,
  singlePlay,
} from '@/controllers';
import { RouteType } from '@/types';

const routes: RouteType[] = [
  { command: MESSAGE_TYPE.REG, controller: regUser },
  { command: MESSAGE_TYPE.CREATE_ROOM, controller: createRoom },
  { command: MESSAGE_TYPE.ADD_USER_TO_ROOM, controller: addUserToTheRoom },
  { command: MESSAGE_TYPE.ADD_SHIPS, controller: addShips },
  { command: MESSAGE_TYPE.ATTACK, controller: attack },
  { command: MESSAGE_TYPE.RANDOM_ATTACK, controller: randomAttack },
  { command: MESSAGE_TYPE.SINGLE_PLAY, controller: singlePlay },
];

export default routes;
