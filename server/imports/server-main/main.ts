import { DemoCollection } from '../../../both/collections/demo-collection';
import { DemoDataObject } from '../../../both/models/demo-data-object';
import { HTTP } from 'meteor/http';
import { GameObject } from '../../../both/models/game.object';
import { Games } from '../../../both/collections/games.collection';
// var GoogleSpreadsheets = require('google-spreadsheets');
// import * from 'google-spreadsheets';
console.log('start imports');
import { GoogleApiController } from './google-api.controller';

console.log('end imports');

export class Main {
  
  gac: GoogleApiController;
  constructor() {
  }

  start():void {

    this.gac = new GoogleApiController();
    this.gac.start((res) => this.ready(res));
    // this.googleSheets();
    // this.initFakeData();
    // this.initGamesData('76561198314313838');
    // this.initGamesData('76561198016668101');
    // this.initGamesData('76561198321699378'); // me
  }

  ready(res: any): void {
    console.log('ready!!!');
    this.gac.listMajors();
  }

  gt() {
    // GoogleSpreadsheet
    let spreadsheetName = 'vr-history'; // must match exactly the name you gave your Google spreadsheet
    let serviceEmail = '795073958503-qukpg8tt7vbsjqtufgc379ag24200fr3@developer.gserviceaccount.com'; // this is fake; replace with your own

    let result = Meteor.call("spreadsheet/fetch2", spreadsheetName, "1", {email: serviceEmail});
    console.log(result);
  }

  googleSheets() {
    console.log('GooGle sheets!!!');
    this.gt();
  }

  initGamesData(steamId) {
    console.log('GET GAMES');
    HTTP.call('GET', `http://steamcommunity.com/profiles/${steamId}/games/?tab=all&xml=1`, {},
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
                  // Games.remove({});
                  console.error('errors',jsError);


                  jsResult.gamesList.games.game.map(
                    (game: GameObject) => {
                      console.log(game);
                      game.steamId = steamId;
                      game.selected = false;
                      game.logo_big = `http://cdn.akamai.steamstatic.com/steam/apps/${game.appID}/header.jpg`;
                      game.logo = `this.src='${game.logo}'`;
                      // Games.update(
                      //   {
                      //       'appID': game.appID,
                      //   },
                      //   game);
                      if(!Games.findOne({'appID': game.appID})) {
                          game.app = game.name.split(' ')[0].toLowerCase();
                          // Games.insert(game);
                          Games.update({'appID': game.appID}, game, {upsert: true});
                      }
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
