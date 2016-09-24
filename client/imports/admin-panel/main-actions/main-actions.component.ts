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
    // if ()
    let id = '';
    // this.games.selectedGame.appID;

    if (id == '462520') {
      // "appID":"462520",
      // "name":"Super Kaiju",
      this.remote.sendkeys('%23{UP}');
    }
    else {
      this.remote.sendkeys('%23{UP}');
      // this.remote.sendkeys('!{ENTER}');  
    }
  }

  sendKeys(keys) {
   this.remote.sendkeys(keys); 
  }


  killAll() {
    this.games.killAll();
    // let apps = this.gamesService.games.fetch().map(game => game.app);
    // this.remote.killApps(apps);
  }

  adminModeToggle() {
    this.session.toggleAdminMode();
  }
  
}
