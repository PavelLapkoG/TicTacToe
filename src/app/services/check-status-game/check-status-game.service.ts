import { Injectable } from '@angular/core';

@Injectable()
export class CheckStatusGameService {

  constructor() { }

  private fieldSize: number | undefined;
  patternWin = [0, /(1){5}/, /(2){5}/, /[01]*7[01]*/, /[02]*7[02]*/];

  public checkStatus(x: number, y: number, fieldArray: Array<any>): boolean {
    this.fieldSize = fieldArray.length;

    const motion: string = fieldArray[x][y];
    const directionArray = ['', '', '', ''];

    const xTop = Math.min(x, 4);
    const xRight = Math.min(this.fieldSize - y - 1, 4);
    const xBottom = Math.min(this.fieldSize - x - 1, 4);
    const xLeft = Math.min(y, 4);

    for (let j = x - xTop; j <= x + xBottom; j++) {
      directionArray[0] += fieldArray[j][y] || 0;
    }

    for (let i = y - xLeft; i <= y + xRight; i++) {
      directionArray[1] += fieldArray[x][i] || 0;
    }

    for (let i = -Math.min(xTop, xLeft); i <= Math.min(xRight, xBottom); i++) {
      directionArray[2] += fieldArray[x + i][y + i] || 0;
    }

    for (let i = -Math.min(xBottom, xLeft); i <= Math.min(xRight, xTop); i++) {
      directionArray[3] += fieldArray[x - i][y + i] || 0;
    }

    for (const position of directionArray) {
      if (position.search(this.patternWin[motion]) >= 0) {
        return false;
      }
    }
    return true;
  }

}
