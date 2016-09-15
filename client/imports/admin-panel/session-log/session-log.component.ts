/**
 * Created by babysharny on 07-Sep-16.
 */
import {Component, OnInit, Inject, Input} from '@angular/core';

import {SessionService} from "../../services/session.service";
import {GamesService} from "../../services/games.service";
import {AdminPanelService} from "../../services/admin-panel.service";

import {Sessions} from "../../../../both/collections/sessions.collection";

import template from './session-log.component.html';
import styles from './session-log.component.css';

@Component({
  // moduleId: module.id,
  selector: 'app-session-log',
  template,
  styles
})
export class SessionLogComponent implements OnInit {


  steam: string; // name of steam account

  startDate: string;
  endDate: string;

  time: string;   // time in game
  players: any[]; // name // phone
  games: any[];   // name of game
  discount: any;  // free mins // discount in prcent
  money: string;  // cash
  closedOn;

  constructor(
    private session: SessionService,
    private service: AdminPanelService,
    private gamesService: GamesService
  ) { }

  ngOnInit() { }
  
  fake = {
    steam: 'NEO',
    startDate: '1234567890987',
    endDate: '1234567898765',
    time: '12 min',
    players: [
      {
        name: 'Alex',
        phone: ''
      }
    ],
    games: [
      'Moirai',
      'Dota',
      'Hueta'
    ],
    discount: {
      freeMins: '25 min',
      discount: '30%'
    },
    money: '0 P'
  };

  saveSession() {
    Sessions.insert(this.fake);
  }

  playSound(){

    var audio = new Audio('./sound.mp3');
    audio.addEventListener('canplaythrough', function() {
      audio.play();
    });

  }
}
