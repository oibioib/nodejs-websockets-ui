export type ColorType = string;

export type ColorsType = {
  black: ColorType;
  red: ColorType;
  green: ColorType;
  yellow: ColorType;
  blue: ColorType;
  magenta: ColorType;
  cyan: ColorType;
  white: ColorType;
  gray: ColorType;
};

export type ColorNameType = keyof ColorsType;

const colors: ColorsType = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
};

const colorReset: ColorType = '\x1b[0m';

export type MessageType = { color: ColorNameType; message: string };

const printColorMessageToConsole = (...messages: MessageType[]) => {
  const toLog: string = messages.reduce((head, { color, message }) => {
    return `${head}${colors[color]}${message}${colorReset}`;
  }, '');
  console.log(toLog);
};

export default printColorMessageToConsole;
