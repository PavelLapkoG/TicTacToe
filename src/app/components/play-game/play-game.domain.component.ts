export enum SETTINGS_DIALOG_TYPE {
  START,
  END,
}

export enum SETTINGS_DIALOG_WINNER {
  FIRST_PLAYER,
  SECOND_PLAYER,
  DRAW,
}

export interface ISettinsDialogData {
  type: SETTINGS_DIALOG_TYPE;
  winner: SETTINGS_DIALOG_WINNER;
}

