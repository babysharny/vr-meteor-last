import { DemoCollection } from '../../../both/collections/demo-collection';
import { DemoDataObject } from '../../../both/models/demo-data-object';
import { HTTP } from 'meteor/http';
import { GameObject } from '../../../both/models/game.object';
import { Games } from '../../../both/collections/games.collection';

export class Main {
  constructor() {
  }

  start():void {
    this.initFakeData();
    this.initGamesData();
  }

  initGamesData() {
    console.log('GET GAMES');
    HTTP.call('GET', 'http://steamcommunity.com/profiles/76561198321699378/games/?tab=all&xml=1', {},
        (err: any, res: any) => {
          if(err) {
            console.log('ERROR!');
          }
          else {
            console.log(res.content);
            xml2js.parseString(
                res.content,
                {
                    charkey: '',
                    explicitCharkey: false,
                    trim: true,
                    explicitArray: false,
                    charsAsChildren: true
                },

                (jsError, jsResult) => {
                  Games.remove({});
                  console.error('errors',jsError);

                  jsResult.gamesList.games.game.map(
                    (game: GameObject) => {
                      console.log(game);

                      game.selected = false;
                      game.logo_big = `http://cdn.akamai.steamstatic.com/steam/apps/${game.appID}/header.jpg`;
                      game.logo = `this.src='${game.logo}'`;

                      Games.insert(game);
                    }
                  );
                }
            );

          }
        });

  }

  initFakeData():void {
    if (DemoCollection.find({}).count() === 0) {
      DemoCollection.insert(<DemoDataObject>{
        name: 'Dotan',
        age: 25
      });

      DemoCollection.insert(<DemoDataObject>{
        name: 'Liran',
        age: 26
      });

      DemoCollection.insert(<DemoDataObject>{
        name: 'Uri',
        age: 30
      });
    }
  }
}
