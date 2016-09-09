/**
 * Created by babysharny on 07-Sep-16.
 */
import {Component, OnInit, Inject, Input} from '@angular/core';

import {SessionService} from "../../services/session.service";
import {GamesService} from "../../services/games.service";
import {AdminPanelService} from "../../services/admin-panel.service";

import template from './session-log.component.html';
import styles from './session-log.component.css';

@Component({
  // moduleId: module.id,
  selector: 'app-session-log',
  template,
  styles
})
export class SessionLogComponent implements OnInit {


  steamId;

  startedOn;

  initMins;
  freeMins;
  players;
  des;

  realTime;
  gamez;

  closedOn;

  CLIENT_ID = 'AIzaSyBVEBANyo9yc-RgxzvI80ZS7jM_f_CLFQE';
  SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

  constructor(
    private session: SessionService,
    private service: AdminPanelService,
    private gamesService: GamesService
  ) { }

  ngOnInit() { }

  auth() {

  }

}
