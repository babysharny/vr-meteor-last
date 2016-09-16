import { Injectable } from '@angular/core';
import {GamesService} from "./games.service";
import {PlayersService} from "./players.service";
import {AdminPanelService} from './admin-panel.service';

import * as moment from 'moment';

import {Sessions} from "../../../both/collections/sessions.collection";

enum State {
  Stopped = 1,
  Started,
  Paused
}

export class Player {
  name = "";
  phone = "";
}

export class Session {


  state = State.Stopped;
  players: Player[] = [];
  games: any[] = [];
  minutes: number = 0;
  logs: any[];

  constructor() { }

  addGame(game: any) {
    if(this.games.length > 0 && this.games[this.games.length - 1] == game) {
      console.log('Secondary start game: ', game.name);
      return;
    }
    this.games.push(game);
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }
}

@Injectable()
export class SessionService {

  // state: State = State.Stopped;
  // players: Player[] = [];

  adminMode = false;

  current = new Session;

  // minutes = 60;
  minutes = 15;
  freeMinutes = 0;
  discount = 0;

  priceList = {
    min15:  350,
    min30:  650,
    min45:  800,
    min60: 1000,
  };

  timer = new StopWatch();


  constructor(
    private gamesService: GamesService,
    private remote: PlayersService,
    private games: GamesService,
    private admin: AdminPanelService
  ) { }

  isStarted(): boolean {
    if (this.current.state != State.Stopped) {
      return true;
    }
    return false;
  }

  validatePlayers(): boolean {
    return (this.current.players.length > 0);
  }

  nextState() {
    if (this.current.state == State.Stopped) {
      this.startSession();
    }
    else if (this.current.state == State.Started) {
      this.pauseSession();
    }
    else if (this.current.state == State.Paused) {
      this.stopSession();
    }
  }

  startSession() {
      console.log('Start session');
      if (!this.validatePlayers()) {
        alert('Add players!');
        return;
      }
      // start timer
      this.timer.start();
      this.timer.endTime = (this.minutes + this.freeMinutes)*60;
      // todo add game to log and save to Google Sheets

      // todo set GG button name

      this.current.state = State.Started;
  }

  pauseSession() {
      console.log('Pause session');
      // pause timer
      this.timer.pause();

      // todo show log

      // stop all games
      this.games.killAll();
      this.remote.video();
      // todo open video or bill on remote
      // todo open text field to save descriptions

      this.current.state = State.Paused;
  }

  stopSession() {
      console.log('Stop session');
      // todo send session to Google Sheets
      // create obj
      // save to mongo
      this.saveSession();


      this.timer.stop();
      this.current = new Session();
      this.current.state = State.Stopped;
  }

  toggleAdminMode() {
    if (this.adminMode) {
      this.stopAdminMode();
    }
    else {
      this.startAdminMode();
    }
  }

  startAdminMode() {
    this.adminMode = true;
    this.games.killAll();
    this.current = new Session;
    this.current.state = State.Stopped;
  }

  stopAdminMode() {
    this.adminMode = false;
    this.games.killAll();
    this.current = new Session;
    this.current.state = State.Stopped;
  }

  saveSession() {

    let now = moment().format('MM-DD-YYYY');
    
    let fake = {
      steam: this.admin.data.name,
      startDate: moment(this.timer.startDate).format('DD/MM HH:mm'),
      endDate: moment().format('DD/MM HH:mm'),
      time: moment.unix(this.timer.moment).utc().format('HH:mm:ss'),
      players: this.current.players,
      games: this.current.games.map(game => game.name),
      discount: {
        freeMins: this.freeMinutes + ' минут',
        discount: this.discount + '%'
      },
      money: this.report(this.timer.moment, this.freeMinutes*60, this.discount) + ' P'
    };

    Sessions.insert(fake);
  }


  startTimer() {
    this.timer.start();
  }

  pauseTimer() {
    this.timer.pause();
  }

  stopTimer() {
    this.timer.stop();
  }

  report(time: any, bonusTime: any, discount: any): any {

    if (time <= bonusTime) {
      return '0';
    }

    time -= bonusTime;

    let priceList = {
      min15:  350,
      min30:  650,
      min45:  800,
      min60: 1000,
    };

    let secondPrice = 0;
    if (time <= 15*60) {
      secondPrice = priceList.min15 / 15 / 60;
    }
    else if (time <= 30*60) {
      secondPrice = priceList.min30 / 30 / 60;
    }
    else if (time <= 45*60) {
      secondPrice = priceList.min45 / 45 / 60;
    }
    else {
      secondPrice = priceList.min60 / 60 / 60;
    }

    if (discount > 0) {
      secondPrice -= secondPrice*discount/100;
    }

    return Math.floor(time * secondPrice);
  }
}



export class StopWatch {

  timer: any;
  moment = 0;

  startDate = new Date();

  endTime = 15;

  constructor() { }

  start() {
    this.pause();
    this.timer = setInterval(
      () => {
        this.moment += 1;
        // console.log('time ', this.toH())
        if (this.moment == this.endTime) {
          this.playSound();
        }
      },
      1000
    );
  }

  pause() {
    clearInterval(this.timer);
  }

  stop() {
    clearInterval(this.timer);
    this.moment = 0;
  }

  toH() {
    let sec_num = parseInt(''+this.moment, 10); // don't forget the second param
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    let hS = '' + hours;
    let mS = '' + minutes;
    let sS = '' + seconds;

    if (hours   < 10) {hS   = '0' + hours;}
    if (minutes < 10) {mS = '0' + minutes;}
    if (seconds < 10) {sS = '0' + seconds;}

    return hS+':'+mS+':'+sS;
  }

  playSound() {

    var audio = new Audio('./sound.mp3');
    audio.addEventListener('canplaythrough', function() {
      audio.play();
    });

  }
}

