export const messageRequiredFields = ['type', 'data'] as const;

export enum MESSAGE_TYPE {
  REG = 'reg',
  UPDATE_WINNERS = 'update_winners',
}
