import { MESSAGE_TYPE } from '@/config/message';
import { regUser } from '@/controllers';
import { RouteType } from '@/types';

const routes: RouteType[] = [{ command: MESSAGE_TYPE.REG, controller: regUser }];

export default routes;
