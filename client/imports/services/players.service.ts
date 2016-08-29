import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class PlayersService {

  host = '192.168.88.149:8080';

  constructor(
    private http: Http
  ) { }

  startSteam() {
    console.log("start steam signal here");
    let url = `http://${this.host}/1/startSteam`;
    this.http.get(url)
      .subscribe(
        x => {
          console.log(x);
        }
      )
  }

  restartSteam() {
    this.killApp('steam');
    this.startSteam();
  }

  killApp(appName) {
    let url = `http://${this.host}/1/cmd?cmd=taskkill /f /im ${appName}*`;
    console.info(url);
    this.http.get(url)
      .subscribe(
        x => {
          console.log(x);
        }
      )
  }

  startGame(game) {
    // let host = '192.168.88.149:8080';
    // let host = 'localhost:8080';
    // let url = `http://${host}/1/employees/${game.appID}?secret_admin=boilerplatesRock`;

    let url = `http://${this.host}/1/steam?cmd="steam://run/${game.appID}"`;

    // let url = `http://localhost:8080/1/employees`;
    console.info('START GAME ', game);
    console.info(url);
    this.http.get(url)
      .subscribe(
        x => {
          console.log(x);
        }
      )
  }

}
