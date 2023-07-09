import { RawData } from 'ws';

export class IncomingMessageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IncomingMessageError';
  }
}

export const parseIncomingMessage = (incomingData: RawData, requiredFields?: string[]) => {
  try {
    const message = JSON.parse(incomingData.toString());

    if (requiredFields) {
      requiredFields.forEach((field) => {
        if (!(field in message)) throw new Error(`Message hasn't ${field}`);
      });
    }

    return message;
  } catch (error) {
    throw new IncomingMessageError(`Wrong incoming message. ${error.message}`);
  }
};
