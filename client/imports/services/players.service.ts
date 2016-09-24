import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {SessionService} from './session.service';

@Injectable()
export class PlayersService {

  host = '192.168.88.149';
  port = '81';

  constructor(
    private http: Http
  ) { }

  url() {
    return `http://${this.host}:${this.port}/1/`;
  }

  restartSteam() {
    console.log('start steam signal here');
    let url = this.url() + `restartSteam`;
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
    let url = this.url() + `sendKeys?keys={MEDIA_PLAY_PAUSE}`;
    this.http.get(url)
      .subscribe(
        x => {
          console.log(x);
        }
      );
  }

  video() {
    console.log('Open Video');
    let url = this.url() + `video`;
    this.http.get(url)
      .subscribe(
        x => {
          console.log(x);
        }
      );
  }

  sendkeys(keys, appName?) {
    let url = this.url() + `sendKeys?keys=${keys}`;

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
    let url = this.url() + `cmd?cmd=taskkill /f /im ${appName}*`;
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
    let url = this.url() + `cmd?cmd=${cmd}`;
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

    let url = this.url() + `steam?cmd="steam://run/${game.appID}"`;

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
