import { MESSAGE_TYPE } from '@/config/message';
import { parseIncomingData, sendResponseMessage } from '@/lib/message';
import { ControllerType } from '@/types/types';
import updateWinners from './updateWinners';
import updateRoom from './updateRoom';

type RegUserDataType = {
  name: string;
  password: string;
};

const getUserRegData = (userData: unknown) => {
  try {
    const { name, password } = userData as RegUserDataType;
    if (typeof name !== 'string') throw Error("Name isn't string");
    if (typeof password !== 'string') throw Error("Password isn't string");
    if (!name) throw Error("Name isn't defined");
    if (!password) throw Error("Password isn't defined");
    return { name, password };
  } catch {
    throw new Error('Incorrect user reg data');
  }
};

const regUser: ControllerType = async (db, incomingMessage, ws) => {
  const responseData = {
    name: '',
    index: -1,
    error: false,
    errorText: '',
  };

  try {
    const parsedData = parseIncomingData(incomingMessage.data);
    const { name, password } = getUserRegData(parsedData);

    responseData.name = name;

    const userInDb = await db.findUserByUsername(name);

    if (userInDb) {
      const { index, password: userInDbPassword } = userInDb;

      responseData.index = index;
      ws.userIndex = index;
      ws.userName = name;

      if (userInDbPassword !== password) {
        responseData.error = true;
        responseData.errorText = 'Incorrect login or password';
      }
    }

    if (!userInDb) {
      const { index } = await db.addUser(name, password);
      responseData.index = index;
      ws.userIndex = index;
      ws.userName = name;
    }

    sendResponseMessage(MESSAGE_TYPE.REG, responseData, ws);

    if (!responseData.error) {
      await updateWinners(db);
      await updateRoom(db);
    }
  } catch (error) {
    responseData.errorText = error.message;
    sendResponseMessage(MESSAGE_TYPE.REG, responseData, ws);
  }
};

export default regUser;
