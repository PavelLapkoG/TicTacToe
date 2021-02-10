import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FIELD_MAX_SIZE, FIELD_MIN_SIZE } from '../../constants';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISettingsDialogData, SETTINGS_DIALOG_TYPE, SETTINGS_DIALOG_WINNER } from '../play-game/play-game.domain.component';

@Component({
  selector: 'app-start-settings-dialog',
  templateUrl: './start-settings-dialog.component.html',
  styleUrls: ['./start-settings-dialog.component.scss']
})
export class StartSettingsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ISettingsDialogData,
    public dialogRef: MatDialogRef<StartSettingsDialogComponent>,
    private router: Router
  ) {}

  public fieldMaxSize: number | undefined;
  public fieldMinSize: number | undefined;

  public sizeControl: FormControl | undefined;

  public ngOnInit(): void {
    this.fieldMaxSize = FIELD_MAX_SIZE;
    this.fieldMinSize = FIELD_MIN_SIZE;
    this.sizeControl = new FormControl('', [
      Validators.max(this.fieldMaxSize),
      Validators.min(this.fieldMinSize),
      Validators.required]);
  }

  public isStartType(): boolean {
    return this.data.type === SETTINGS_DIALOG_TYPE.START;
  }

  public isEndType(): boolean {
    return this.data.type === SETTINGS_DIALOG_TYPE.END;
  }

  public isFirstPlayerWins(): boolean {
    return !!this.data.winner && this.data.winner === SETTINGS_DIALOG_WINNER.FIRST_PLAYER;
  }

  public isSecondPlayerWins(): boolean {
    return this.data.winner && this.data.winner === SETTINGS_DIALOG_WINNER.SECOND_PLAYER;
  }

  public isDraw(): boolean {
    return this.data.winner && this.data.winner === SETTINGS_DIALOG_WINNER.DRAW;
  }

  public goToMainMenu(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/');
  }

  public playAgain(): void {
    this.data.type = SETTINGS_DIALOG_TYPE.START;
  }
}
