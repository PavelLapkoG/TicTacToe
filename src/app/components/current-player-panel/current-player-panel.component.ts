import { Component, Input } from '@angular/core';
import { GAME_PLAYER } from '../play-game/play-game.domain.component';

@Component({
  selector: 'app-current-player-panel',
  templateUrl: './current-player-panel.component.html',
  styleUrls: ['./current-player-panel.component.scss']
})
export class CurrentPlayerPanelComponent {

  @Input()
  private currentPlayer: GAME_PLAYER | undefined;

  constructor() { }

  public get isFirstCurrentPlayer(): boolean {
    return this.currentPlayer === GAME_PLAYER.FIRST;
  }

  public get isSecondCurrentPlayer(): boolean {
    return this.currentPlayer === GAME_PLAYER.SECOND;
  }

}
