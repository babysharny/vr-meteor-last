/**
 * Created by babysharny on 06-Sep-16.
 */
import {Component, OnInit, Inject, Input} from '@angular/core';

import {SessionService} from "../../services/session.service";
import {GamesService} from "../../services/games.service";
import {AdminPanelService} from "../../services/admin-panel.service";
import {Remotes} from "../../../../both/collections/remotes.collection";
import template from './settings.component.html';
import styles from './settings.component.css';

@Component({
  // moduleId: module.id,
  selector: 'app-settings',
  template,
  styles
})
export class SettingsComponent implements OnInit {

  constructor(
    private service: AdminPanelService,
    private gamesService: GamesService
  ) { }

  ngOnInit() { }

  save(game) {
    this.gamesService.saveGameProcessName(game);
  }

  saveHost(remote) {
    console.log('save ', remote);
    Remotes.update(remote._id, {
      $set: {
        host: remote.host
      }
    });
  }

  toggleHidden(game) {
    game.hidden = !game.hidden; 
    this.gamesService.saveGame(game); 
  }

}
