import { DemoCollection } from '../../../both/collections/demo-collection';
import { DemoDataObject } from '../../../both/models/demo-data-object';
import { HTTP } from 'meteor/http';
import { GameObject } from '../../../both/models/game.object';
import { Games } from '../../../both/collections/games.collection';
import { Sessions } from '../../../both/collections/sessions.collection';
import { GoogleApiController } from './google-api.controller';


export class Main {

  gac: GoogleApiController;
  constructor() { }

  start():void {

    this.gac = new GoogleApiController();
    this.gac.start((res) => this.ready(res));


    let sheetId = '1wOXAU9iQHtaERYsseUjSq6QOLIVuVBp1J7uTuCsf_64';

    let isInit = true;
    Sessions.find().observeChanges({
      added: (id, doc) => {
        if(isInit) return;
        console.log('## Add session to Google Docs', doc);
        // console.log(doc);
        this.gac.saveSession(doc, sheetId);
      }
    });

    isInit = false;

    this.initGamesData('76561198314313838');
    this.initGamesData('76561198016668101');
    // this.initGamesData('76561198321699378'); // me
  }

  ready(res: any): void {
    console.info('## Google API Ready!');
  }

  initGamesData(steamId) {
    console.log('### GET GAMES FROM STEAM FOR ', steamId);
    HTTP.call('GET', `http://steamcommunity.com/profiles/${steamId}/games/?tab=all&xml=1`, {},
        (err: any, res: any) => {
          if(err) {
            console.error('Get games list from steam failed: ', err);
          }
          else {
            // console.log(res.content);
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

                  if (jsError) {
                    console.error('Parse error ', jsError);  
                  }
                  

                  jsResult.gamesList.games.game.map(
                    (game: GameObject) => {
                      // console.log(game);

                      // Setup game object
                      game.steamId = steamId;
                      game.selected = false;
                      game.hidden = false;
                      game.logo_big = `http://cdn.akamai.steamstatic.com/steam/apps/${game.appID}/header.jpg`;
                      game.logo = `this.src='${game.logo}'`;

                      // Update Game if not exist
                      if(!Games.findOne({'appID': game.appID, 'steamId': steamId})) {
                          // add app process name for new games
                          game.app = game.name.split(' ')[0].toLowerCase();
                          Games.update({'appID': game.appID, 'steamId': steamId}, game, {upsert: true});
                          console.info('add new game ', game.name);
                      }
                    }
                  );
                }
            );

          }
        });

  }
}
