import {Component, OnInit, Inject} from '@angular/core';
import {Player, SessionService} from "../../services/session.service";
import template from './player-login.component.html';
import styles from './player-login.component.css';

@Component({
  // moduleId: module.id,
  selector: 'app-player-login',
  template,
  styles
})
export class PlayerLoginComponent implements OnInit {

  player = new Player;

  constructor(
    @Inject(SessionService) private session: SessionService
  ) { }
  // isdsd: MaskedInput;
  ngOnInit() {

  }

  add() {
    // todo validate fields
    console.log(this.player);
    this.session.current.addPlayer(this.player);
    this.player = new Player;
  }
}
