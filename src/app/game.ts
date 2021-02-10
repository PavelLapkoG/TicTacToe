export class Game {
  loading: boolean;
  currentPlayer: boolean;
  size: number;
  totalCells: number;
  field: Array<any>;
  addField(field) {
    this.field = field;
    this.size = field.length;
    this.totalCells = field.length * field.length;
    this.currentPlayer = true;
  }
  identifyWinner() {
    if (this.totalCells === 0) {
      return 0;
    } else {
      return this.currentPlayer ? 2 : 1;
    }
  }
}
