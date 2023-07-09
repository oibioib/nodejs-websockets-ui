import { RawData } from 'ws';
import { parseIncomingMessage } from '@/lib/message';
import log from '@/lib/logger';

const controller = (incomingMessage: RawData) => {
  try {
    const message = parseIncomingMessage(incomingMessage, ['type', 'data']);
    console.log('controller - message:', message);
  } catch (error) {
    log.serverErrorMessage(`ControllerError. ${error.message}`);
  }
};

export default controller;
