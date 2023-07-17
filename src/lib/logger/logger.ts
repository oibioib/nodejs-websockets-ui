import { printColorMessageToConsole } from '@/lib/colors';
import { EOL } from 'os';
import { MessageType } from '../colors/colors';
import { ExtendWebSocket } from '@/types';

type LogMessageType = string | undefined;

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
  printColorMessageToConsole(
    {
      color: 'white',
      message: EOL,
    },
    {
      color: 'magenta',
      message,
    }
  );
};

export const webSocketServerIncomingMessage = (ws: ExtendWebSocket, message: LogMessageType) => {
  if (!message) return;

  const { id, userIndex, userName } = ws;

  const messageChunk: MessageType[] = [];

  if (id) {
    messageChunk.push(
      {
        color: 'white',
        message: `[`,
      },
      {
        color: 'green',
        message: id,
      },
      {
        color: 'white',
        message: `] `,
      }
    );
  }

  if (userIndex) {
    messageChunk.push(
      {
        color: 'white',
        message: `[`,
      },
      {
        color: 'green',
        message: userName ? `User: ${userName}, ` : '',
      },
      {
        color: 'green',
        message: `UserIndex: ${userIndex}`,
      },
      {
        color: 'white',
        message: `] `,
      }
    );
  }

  if (messageChunk.length) {
    messageChunk.push({
      color: 'white',
      message: `${EOL}  `,
    });
  }

  printColorMessageToConsole(
    {
      color: 'white',
      message: `${EOL}[`,
    },
    {
      color: 'green',
      message: 'Incoming message',
    },
    {
      color: 'white',
      message: `] `,
    },
    ...messageChunk,
    {
      color: 'white',
      message: message,
    }
  );
};

export const webSocketServerOutgoingMessage = (message: LogMessageType) => {
  if (!message) return;

  printColorMessageToConsole(
    {
      color: 'white',
      message: `${EOL}[`,
    },
    {
      color: 'blue',
      message: 'Outgoing message',
    },
    {
      color: 'white',
      message: `] ${EOL}  `,
    },
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
      message: `${EOL}[`,
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

export const infoMessage = (message: LogMessageType) => {
  if (!message) return;
  printColorMessageToConsole(
    {
      color: 'white',
      message: `${EOL}[`,
    },
    {
      color: 'yellow',
      message: 'Info',
    },
    {
      color: 'white',
      message: `] `,
    },
    {
      color: 'yellow',
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
