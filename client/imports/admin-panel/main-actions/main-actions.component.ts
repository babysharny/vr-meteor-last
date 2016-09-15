import {Component, OnInit, Inject} from '@angular/core';
import template from './main-actions.component.html';
import styles from './main-actions.component.css';
import {PlayersService} from "../../services/players.service";
import {AdminPanelService} from "../../services/admin-panel.service";
import {GamesService} from "../../services/games.service";
import {SessionService} from "../../services/session.service";
import {GgTitlePipe} from "./pipes/gg-title.pipe";

@Component({
  // moduleId: module.id,
  selector: 'app-main-actions',
  pipes: [
    GgTitlePipe
  ],
  template,
  styles
  // templateUrl: 'main-actions.component.html',
  // styleUrls: ['main-actions.component.css']
})
export class MainActionsComponent implements OnInit {

  constructor(
    private session: SessionService,
    private remote: PlayersService,
    private games: GamesService,
    private service: AdminPanelService
  ) { }

  ngOnInit() {
  }


  gg(){
    console.info('SET STATE HERE!');
    this.session.nextState();
    console.info('SET STATE HERE 2!');

  }

  steam() {
    this.remote.restartSteam();
  }

  vr() {
    this.remote.restartVR();
  }

  music() {
    this.remote.playMusic();
  }

  video() {
    this.remote.video();
  }

  fullScreen() {
    // this.games.
    this.remote.sendkeys('!{ENTER}', 'regeria');
  }


  killAll() {
    this.games.killAll();
    // let apps = this.gamesService.games.fetch().map(game => game.app);
    // this.remote.killApps(apps);
  }

}
