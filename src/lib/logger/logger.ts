import { printColorMessageToConsole } from '@/lib/colors';
import { EOL } from 'os';
import { MessageType } from '../colors/colors';
import { UserType } from '@/types';

type LogMessageType = string | undefined;
type LogIdType = string | undefined;

export const httpServerMessage = (message: LogMessageType) => {
  if (!message) return;
  printColorMessageToConsole({
    color: 'cyan',
    message,
  });
};

export const webSocketServerMessage = (message: LogMessageType) => {
  if (!message) return;
  printColorMessageToConsole({
    color: 'yellow',
    message,
  });
};

export const clientMessage = (message: LogMessageType) => {
  if (!message) return;
  printColorMessageToConsole({
    color: 'magenta',
    message,
  });
};

export const webSocketServerIncomingMessage = (wsId: LogIdType, message: LogMessageType) => {
  if (!message) return;

  const idMessageChunk: MessageType[] = [];

  if (wsId) {
    idMessageChunk.push(
      {
        color: 'white',
        message: `[`,
      },
      {
        color: 'magenta',
        message: wsId,
      },
      {
        color: 'white',
        message: `]${EOL}`,
      }
    );
  }

  printColorMessageToConsole(
    {
      color: 'white',
      message: `[`,
    },
    {
      color: 'magenta',
      message: 'Incoming message',
    },
    {
      color: 'white',
      message: `] `,
    },
    ...idMessageChunk,
    {
      color: 'white',
      message: message,
    }
  );
};

export const serverErrorMessage = (message: LogMessageType) => {
  if (!message) return;
  printColorMessageToConsole(
    {
      color: 'white',
      message: `[`,
    },
    {
      color: 'red',
      message: 'Error',
    },
    {
      color: 'white',
      message: `] `,
    },
    {
      color: 'red',
      message: message,
    }
  );
};

export const welcomeMessage = () => {
  //const message = `${EOL}    ____          __   __   __             __     _      ${EOL}   \/ __ ) ____ _ \/ \/_ \/ \/_ \/ \/___   _____ \/ \/_   (_)____ ${EOL}  \/ __  |\/ __ \`\/\/ __\/\/ __\/\/ \/\/ _ \\ \/ ___\/\/ __ \\ \/ \/\/ __ \\${EOL} \/ \/_\/ \/\/ \/_\/ \/\/ \/_ \/ \/_ \/ \/\/  __\/(__  )\/ \/ \/ \/\/ \/\/ \/_\/ \/${EOL}\/_____\/ \\__,_\/ \\__\/ \\__\/\/_\/ \\___\/\/____\/\/_\/ \/_\/\/_\/\/ .___\/ ${EOL}                                                \/_\/    `;
  printColorMessageToConsole(
    {
      color: 'cyan',
      message: `${EOL}    ____          __   __   __             __     _      ${EOL}`,
    },
    {
      color: 'cyan',
      message: `   \/ __ ) ____ _ \/ \/_ \/ \/_ \/ \/___   _____ \/ \/_   (_)____ ${EOL}`,
    },
    {
      color: 'blue',
      message: `  \/ __  |\/ __ \`\/\/ __\/\/ __\/\/ \/\/ _ \\ \/ ___\/\/ __ \\ \/ \/\/ __ \\${EOL}`,
    },
    {
      color: 'magenta',
      message: ` \/ \/_\/ \/\/ \/_\/ \/\/ \/_ \/ \/_ \/ \/\/  __\/(__  )\/ \/ \/ \/\/ \/\/ \/_\/ \/${EOL}`,
    },
    {
      color: 'yellow',
      message: `\/_____\/ \\__,_\/ \\__\/ \\__\/\/_\/ \\___\/\/____\/\/_\/ \/_\/\/_\/\/ .___\/ ${EOL}`,
    },
    {
      color: 'yellow',
      message: `                                                \/_\/    ${EOL}`,
    }
  );
};
