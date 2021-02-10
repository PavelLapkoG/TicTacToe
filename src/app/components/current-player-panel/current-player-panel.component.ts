import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-player-panel',
  templateUrl: './current-player-panel.component.html',
  styleUrls: ['./current-player-panel.component.scss']
})
export class CurrentPlayerPanelComponent implements OnInit {

  @Input() currentPlayer;

  constructor() { }

  ngOnInit() {
  }

}
