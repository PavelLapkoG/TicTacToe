import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StartSettingsDialogComponent } from '../../components/start-settings-dialog/start-settings-dialog.component';
import { CheckStatusGameService } from '../../services/check-status-game/check-status-game.service';
import { Game } from '../../game';
import { MatDialog } from '@angular/material/dialog';
import { SETTINGS_DIALOG_TYPE, SETTINGS_DIALOG_WINNER } from './play-game.domain.component';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})

export class PlayGameComponent {

  public game: Game;

  constructor( private router: Router,
               public settingsDialog: MatDialog,
               private checkService: CheckStatusGameService) {
    this.game = new Game();
    this.openSettingDialog(SETTINGS_DIALOG_TYPE.START);
  }

  public goToMainMenu(): void {
    this.router.navigateByUrl('/');
  }

  /* start game function */
  private startGame(size: number): void {
    this.game.field = [];
    this.game.addField(this.formFieldsArray(size));
  }

  /* create matrix of game field */
  private formFieldsArray(size: number): any {
    const fieldArray = [];
    for (let i = 0; i < size; i++) {
      const lineArray = [];
      for (let j = 0; j < size; j++) {
        lineArray.push(0);
      }
      fieldArray.push(lineArray);
    }
    return fieldArray;
  }

  /* player's step function */
  public motion(x: number, y: number): void {

    this.game.loading = true;
    if (!this.game.field[x][y]) {
      this.game.field[x][y] =  this.game.currentPlayer ? 1 : 2;
    }
    this.game.currentPlayer = !this.game.currentPlayer;
    this.game.totalCells--;
    this.checkGameStatus(x, y);
    this.game.loading = false;
  }

  /* check game status with help of checkService*/
  private checkGameStatus(x: number, y: number): void {
    if (!this.checkService.checkStatus(x, y, this.game.field) || this.game.totalCells === 0) {
      this.openSettingDialog(SETTINGS_DIALOG_TYPE.END, this.game.identifyWinner());
    }
  }

  private openSettingDialog(type: SETTINGS_DIALOG_TYPE, winner?: SETTINGS_DIALOG_WINNER): void {
    const dialog = this.settingsDialog.open(StartSettingsDialogComponent, {
      width: '250px',
      disableClose: true,
      data: {
        type,
        winner,
      }
    });
    dialog.afterClosed().subscribe((result) => this.startGame(result));
  }

}
