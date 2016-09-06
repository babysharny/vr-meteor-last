import {Component, OnInit, Inject} from '@angular/core';
import template from './main-actions.component.html';
import styles from './main-actions.component.css';
import {PlayersService} from "../../services/players.service";

@Component({
  // moduleId: module.id,
  selector: 'app-main-actions',
  template,
  styles
  // templateUrl: 'main-actions.component.html',
  // styleUrls: ['main-actions.component.css']
})
export class MainActionsComponent implements OnInit {

  constructor(
    @Inject(PlayersService) private remote: PlayersService
  ) { }

  ngOnInit() {
  }


  gg(){
    console.info('SET STATE HERE!');
    // let g = this.getSelectedGame();
    // console.info(g);
    // this.remote.startGame(g);
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

}
