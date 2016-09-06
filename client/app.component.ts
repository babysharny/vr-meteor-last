import {Component, ViewEncapsulation} from '@angular/core';

import template from './app.component.html';
import style from './app.component.css';

import {AdminPanelComponent} from "./imports/admin-panel/admin-panel.component";
import {GamesService} from "./imports/services/games.service";
import {HTTP_PROVIDERS} from "@angular/http";
import {PlayersService} from "./imports/services/players.service";

@Component({
  selector: 'app',
  // encapsulation: ViewEncapsulation.None,
  directives: [
      AdminPanelComponent
  ],
  providers: [
      HTTP_PROVIDERS,
      GamesService,
      PlayersService
  ],
  template,
  style
})
export class AppComponent {

  right = {
    name: 'NEO',
    steamId: '76561198016668101',
    host: '192.168.88.48:8080'
  };

  me = {
    name: 'SIMON',
    steamId: '76561198321699378',
    host: '192.168.1.69:81'
  };

  left = {
    name: 'SWITCH',
    steamId: '76561198314313838',
    host: '192.168.88.149:8080'
  };

  constructor() {
      // this.parties = Parties.find();
  }
}
