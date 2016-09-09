import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {NgClass} from "@angular/common";

import {GamesService} from "../services/games.service";
import {PlayersService} from "../services/players.service";
import {SessionService} from "../services/session.service";

import {GamesGridComponent} from "./games-grid/games-grid.component";
import {MainActionsComponent} from "./main-actions/main-actions.component";
import {PlayerLoginComponent} from "./player-login/player-login.component";
import {StateInfoComponent} from "./state-info/state-info.component";
import {StateSwitchersComponent} from "./state-switchers/state-switchers.component";
import {SettingsComponent} from "./settings/settings.component";

import template from './admin-panel.component.html';
import styles from './admin-panel.component.css';

import {Games} from "../../../both/collections/games.collection";
import {AdminPanelService} from "../services/admin-panel.service";
import {SessionLogComponent} from "./session-log/session-log.component";


@Component({
  // moduleId: module.id,
  selector: 'app-admin-panel',
  directives: [
    NgClass,
    PlayerLoginComponent,
    StateInfoComponent,
    StateSwitchersComponent,
    GamesGridComponent,
    MainActionsComponent,
    SettingsComponent,
    SessionLogComponent
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    AdminPanelService,
    GamesService,
    PlayersService,
    SessionService
  ],
  template,
  styles
})
export class AdminPanelComponent implements OnInit {

  @Input() data: any;

  games: any;
  bonuses: any;
  showSettings = false;


  constructor(
    private service: AdminPanelService,
    private gamesService: GamesService,
    private remote: PlayersService
  ) {
    service.data = this.data;
  }

  ngOnInit() {

    // todo ugly
    this.service.data = this.data;


    this.remote.host = this.data.host;
    this.gamesService.init(this.data.steamId);
    this.games = this.gamesService.games;
  }

  saveGame(game) {
    this.gamesService.saveGameProcessName(game);
  }

  getSelectedGame() {
    return this.getSelectedGame();
  }



}
