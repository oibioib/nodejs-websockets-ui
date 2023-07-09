import { MESSAGE_TYPE } from '@/config/message';
import { regUser, updateWinners } from '@/controllers';
import { RouteType } from '@/types';

const routes: RouteType[] = [
  {
    command: MESSAGE_TYPE.REG,
    controller: async (...args) => {
      const [db] = args;
      await regUser(...args);
      await updateWinners(db);
    },
  },
];

export default routes;
