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

  constructor() {
      // this.parties = Parties.find();
  }
}
