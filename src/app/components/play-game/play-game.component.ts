import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StartSettingsDialogComponent} from '../../components/start-settings-dialog/start-settings-dialog.component';
import {CheckStatusGameService} from '../../services/check-status-game/check-status-game.service';
import {MatDialog} from '@angular/material/dialog';
import {GAME_PLAYER, SETTINGS_DIALOG_TYPE, SETTINGS_DIALOG_WINNER} from './play-game.domain.component';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})

export class PlayGameComponent implements OnInit {

  public field: number[][] |undefined;
  public processing: boolean | undefined;
  public currentPlayer: GAME_PLAYER | undefined;
  public possibleMoves: number | undefined;

  constructor( private router: Router,
               public settingsDialog: MatDialog,
               private checkService: CheckStatusGameService) {
  }

  public ngOnInit(): void {
    this.startNewGame();
  }

  public goToMainMenu(): void {
    this.router.navigateByUrl('/');
  }

  // Start game function
  private startGame(size: number): void {
    this.field = this.formFieldsArray(size);
    this.currentPlayer = GAME_PLAYER.FIRST;
    this.possibleMoves = size * size;
  }

  // Create matrix of game field
  private formFieldsArray(size: number): number[][] {
    return Array(size).fill(null).map(() => Array(size));
  }

  // Player's step function
  public doMotion(x: number, y: number): void {
    this.processing = true;

    if (!this.field[x][y]) {
      this.field[x][y] = this.currentPlayer;
    }

    --this.possibleMoves;

    if (this.possibleMoves === 0) {
      this.openSettingDialog(SETTINGS_DIALOG_TYPE.END, SETTINGS_DIALOG_WINNER.DRAW);
    } else if (!this.checkService.checkStatus(x, y, this.field)) {
      this.openSettingDialog(SETTINGS_DIALOG_TYPE.END, this.identifyWinner());
    } else {
      this.currentPlayer = this.currentPlayer === GAME_PLAYER.FIRST ? GAME_PLAYER.SECOND : GAME_PLAYER.FIRST;
    }
    this.processing = false;
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
    dialog.afterClosed().subscribe((result: number) => this.startGame(result));
  }

  private identifyWinner(): SETTINGS_DIALOG_WINNER {
    if (this.currentPlayer === GAME_PLAYER.FIRST) {
      return SETTINGS_DIALOG_WINNER.FIRST_PLAYER;
    } else if (this.currentPlayer === GAME_PLAYER.SECOND) {
      return SETTINGS_DIALOG_WINNER.SECOND_PLAYER;
    }
  }

  public startNewGame(): void {
    this.openSettingDialog(SETTINGS_DIALOG_TYPE.START);
  }

}
