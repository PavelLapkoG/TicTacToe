import { Inject, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../constants';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ISettinsDialogData, SETTINGS_DIALOG_TYPE} from '../play-game/play-game.domain.component';

@Component({
  selector: 'app-start-settings-dialog',
  templateUrl: './start-settings-dialog.component.html',
  styleUrls: ['./start-settings-dialog.component.scss']
})
export class StartSettingsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ISettinsDialogData,
    public dialogRef: MatDialogRef<StartSettingsDialogComponent>,
    private router: Router
  ) {}

  public fieldMaxSize: number | undefined;
  public fieldMinSize: number | undefined;

  public sizeControl: FormControl | undefined;

  public ngOnInit(): void {
    this.fieldMaxSize = Constants.FIELD_MAX_SIZE;
    this.fieldMinSize = Constants.FIELD_MIN_SIZE;
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

  public goToMainMenu(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/');
  }
}
