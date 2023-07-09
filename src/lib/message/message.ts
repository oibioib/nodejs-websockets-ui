import { MESSAGE_TYPE, messageRequiredFields } from '@/config/message';
import { ParseIncomingMessageType } from '@/types';
import { WebSocket } from 'ws';

export const parseIncomingMessage: ParseIncomingMessageType = (incomingMessage) => {
  try {
    const message = JSON.parse(incomingMessage.toString());

    if (messageRequiredFields) {
      messageRequiredFields.forEach((field) => {
        if (!(field in message)) throw new Error(`Message hasn't ${field}`);
        if (typeof field !== 'string') throw new Error(`Message ${field} isn't string`);
      });
    }

    return message;
  } catch (error) {
    throw new Error('Incorrect incoming message.');
  }
};

export const parseIncomingData = (incomingData: string) => {
  try {
    const data = JSON.parse(incomingData);

    return data;
  } catch (error) {
    throw new Error('Incorrect incoming data.');
  }
};

export const sendResponseMessage = (
  messageType: MESSAGE_TYPE,
  responseData: object,
  ws: WebSocket
) => {
  const response = JSON.stringify({
    type: messageType,
    data: JSON.stringify(responseData),
    id: 0,
  });

  ws.send(response);
};
