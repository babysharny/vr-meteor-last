import { Injectable } from '@angular/core';

enum State {
  PreStart = 1,
  Started,
  Paused,
  Stopped
}

export class Player {
  name = "";
  phone = "";
}

@Injectable()

export class SessionService {

  state: State = State.Stopped;
  players: Player[] = [];

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

  constructor() { }

  addPlayer(player: Player) {
    this.players.push(player);
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
