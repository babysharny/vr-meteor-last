import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class PlayersService {

  host = '192.168.88.149:8080';

  constructor(
    private http: Http
  ) { }

  restartSteam() {
    console.log('start steam signal here');
    let url = `http://${this.host}/1/restartSteam`;
    this.http.get(url)
      .subscribe(
        x => {
          console.log(x);
        }
      );
  }

  restartVR() {
    console.log('restart VR');
    this.killApp('vr');
    this.startGame({appID: '250820'});
  }

  playMusic() {
    console.log('Play Music');
    let url = `http://${this.host}/1/sendKeys?keys={MEDIA_PLAY_PAUSE}`;
    this.http.get(url)
      .subscribe(
        x => {
          console.log(x);
        }
      );
  }

  video() {
    console.log('Open Video');

  }

  sendkeys(keys, appName?) {
    let url = `http://${this.host}/1/sendKeys?keys=${keys}`;

    if (appName) {
      url += `&app=${appName}`;
    }

    console.info(url);
    this.http.get(url)
      .subscribe(
        x => {
          console.log(x);
        }
      )
  }

  // restartSteam() {
  //   this.killApp('steam');
  //   this.startSteam();
  // }

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

  killApps(apps: any[]) {
    let cmd = apps.map(
      app => {
        return `taskkill /f /im ${app}*`;
      }
    ).join(' & ');
    cmd = encodeURIComponent(cmd);
    let url = `http://${this.host}/1/cmd?cmd=${cmd}`;
    console.info(url);
    url = decodeURI(url);
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
