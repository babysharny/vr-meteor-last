import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/Rx"
import {Games} from "../../../both/collections/games.collection";
import {PlayersService} from "./players.service";
import {AdminPanelService} from "./admin-panel.service";

@Injectable()
export class GamesService {

  games: any;

  constructor(
    private admin: AdminPanelService,
    private remote: PlayersService
  ) {

  }

  init(steamId){
    this.games = Games.find({
      steamId: steamId
    }, {
      transform: (x) => {
        // console.log('Transform for ', x);
        return x;
      }
    });
  }

  saveAll(games) {
    console.log('save all ', games);
  }

  saveGameProcessName(game) {
    console.log('save ', game);
    Games.update(game._id, {
      $set: {
        app: game.app
      }
    });
  }

  saveGame(game) {
    console.log('save ', game);
    Games.update(game._id, game);
  }

  getSelectedGame() {
    let res;

    this.games.forEach(line => {
      line.forEach(g => {
         if (g.selected === true) {
           res = g;
         }
      })
    });

    return res;
  }



  kill(game) {
    // todo kill game
    // todo deselect game
  }

  killAll() {
    let apps = this.games.fetch().map(game => game.app);
    this.remote.killApps(apps);
    console.log('admin', this.admin);
    console.log('data', this.admin.data);

    // todo ugly
    Games.find(
      {
        'steamId' : this.admin.data.steamId,
        'selected' : true
      }
    ).fetch().forEach(
      g => {
        Games.update(g._id, {
          $set: {
            selected: false
          }
        });
      }
    );
  }

}
