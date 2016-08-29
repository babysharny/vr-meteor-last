import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {GamesService} from "../services/games.service";
import {PlayersService} from "../services/players.service";
import {NgClass} from "@angular/common";
import {GamesGridComponent} from "./games-grid/games-grid.component";
import {MainActionsComponent} from "./main-actions/main-actions.component";
import {PlayerLoginComponent} from "./player-login/player-login.component";
import {StateInfoComponent} from "./state-info/state-info.component";
import {StateSwitchersComponent} from "./state-switchers/state-switchers.component";
import {SessionService} from "../services/session.service";
import template from './admin-panel.component.html';
import styles from './admin-panel.component.css';

import {Games} from "../../../both/collections/games.collection";


@Component({
  // moduleId: module.id,
  selector: 'app-admin-panel',
  directives: [
    NgClass,
    PlayerLoginComponent,
    StateInfoComponent,
    StateSwitchersComponent,
    GamesGridComponent,
    MainActionsComponent
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [SessionService],
  template,
  styles
})
export class AdminPanelComponent implements OnInit {

  @Input() data: any;

  games: any;
  bonuses: any;
  showSettings = false;


  constructor(
    private gamesService: GamesService,
    private remote: PlayersService
  ) {

  }

  ngOnInit() {
    this.remote.host = this.data.host;
    // this.gamesService.updateForId(this.data.steamId, this.data.remote);
    this.games = Games.find({
      steamId: this.data.steamId
    }, {
      transform: (x) => {
        console.log('Transform for ', x);
        return x;
      }
    });
  }
  saveAll(games) {
    console.log('save all ', games);
  }

  saveGame(game) {
    console.log('save ', game);
    Games.update(game._id, {
      $set: {
        app: game.app
      }
    });
  }

  getSelectedGame() {
    let res;

    this.games.forEach(line => {
      line.forEach(g => {
         if (g.selected === true) {
           res = g;
         }
      })
    });

    return res;
  }



  startSteam(){
    this.remote.startSteam();
  }


}
