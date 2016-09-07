import { Injectable } from '@angular/core';
import {GamesService} from "./games.service";
import {PlayersService} from "./players.service";

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
  minutes: number = 0;
  logs: any[];

  constructor() {

  }

  addPlayer(player: Player) {
    this.players.push(player);
  }
}

@Injectable()
export class SessionService {

  // state: State = State.Stopped;
  // players: Player[] = [];

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

  constructor(
    private gamesService: GamesService,
    private remote: PlayersService,
    private games: GamesService
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

  nextState(): boolean {
    if (this.current.state == State.Stopped) {
      console.log('Start session');
      if (!this.validatePlayers()) {
        alert('Add players!');
        return;
      }
      // start timer
      this.timer.start();

      // todo add game to log and save to Google Sheets

      // todo set GG button name

      this.current.state = State.Started;
    }
    else if (this.current.state == State.Started) {
      console.log('Pause session');
      // pause timer
      this.timer.pause();

      // todo show log

      // stop all games
      this.games.killAll();

      // todo open video or bill on remote
      // todo open text field to save descriptions

      this.current.state = State.Paused;

    }
    else if (this.current.state == State.Paused) {
      console.log('New session');

      // todo send session to Google Sheets
      this.timer.stop();
      this.current = new Session();

      this.current.state = State.Stopped;

    }
  }

  timer = new StopWatch();

  startTimer() {
    this.timer.start();
  }

  pauseTimer() {
    this.timer.pause();
  }

  stopTimer() {
    this.timer.stop();
  }
}

export class StopWatch {

  timer: any;
  moment = 0;

  constructor() { }

  start() {
    this.pause();
    this.timer = setInterval(
      () => {
        this.moment += 1;
        // console.log('time ', this.toH())
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
}

