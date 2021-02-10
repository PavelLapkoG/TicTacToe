import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PlayGameComponent} from './components/play-game/play-game.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {CheckStatusGameService} from './services/check-status-game/check-status-game.service';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {CurrentPlayerPanelComponent} from './components/current-player-panel/current-player-panel.component';
import {BlockComponent} from './components/block/block.component';
import {StartPageComponent} from './components/start-page/start-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import {StartSettingsDialogComponent} from './components/start-settings-dialog/start-settings-dialog.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    PlayGameComponent,
    StartSettingsDialogComponent,
    PageNotFoundComponent,
    BlockComponent,
    CurrentPlayerPanelComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [CheckStatusGameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
