import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/Rx"

@Injectable()
export class GamesService {

  left = [];
  right = [];
  rightGrid = [];

  constructor(
    private http: Http
  ) { }

  updateLeft() {

  }

  updateRight() {

  }

  updateForId(steamId: any, remote: any) {
    return;
    steamId = '76561198314313838';

    // let url = `http://steamcommunity.com/profiles/${steamId}/games/?tab=all&xml=1`;
    // let url = `./api/games.xml`;
    // let url = `./api/games.json`;
    let url = `./api/switch_games.json`;
    // let url = `./api/games_all.json`;
    this.http.get(url)
      .subscribe(
        (res: any) => {
          let obj = JSON.parse(res._body);
          console.log(res);
          console.log(obj);
          this.right = obj.games
            .map((x: any) => {

                x.selected = false;
                x.logo_big = `http://cdn.akamai.steamstatic.com/steam/apps/${x.appID}/header.jpg`;
                x.logo = `this.src='${x.logo}'`;
                return x;
              }
            );

          let grid = [];
          let line = [];
          this.right.forEach(
            (g: any, index: number, arr: any[]) => {
              line.push(g);
              if ((index+1)%4 == 0 || arr.length - 1 == index) {
                grid.push(line);
                line = [];
              }
            });
          console.log(grid);
          this.rightGrid = grid;
        }
      )
  }

}
