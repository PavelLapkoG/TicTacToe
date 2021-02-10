export enum SETTINGS_DIALOG_TYPE {
  START,
  END,
}

export enum SETTINGS_DIALOG_WINNER {
  FIRST_PLAYER = 1,
  SECOND_PLAYER,
  DRAW,
}

export enum GAME_PLAYER {
  FIRST,
  SECOND,
}


export interface ISettingsDialogData {
  type: SETTINGS_DIALOG_TYPE;
  winner?: SETTINGS_DIALOG_WINNER;
}

