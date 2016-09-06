import { HTTP } from 'meteor/http';
import { GameObject } from '../../../both/models/game.object';
import { Games } from '../../../both/collections/games.collection';

export class GamesContorller() {
	
	constructor(
		private steamId: any
		) { }

	getGames() {
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
	                  Games.remove({});
	                  console.error('errors',jsError);

	                  jsResult.gamesList.games.game.map(
	                    (game: GameObject) => {
	                      console.log(game);
	                      game.steamId = steamId;
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

	updateGames(games) {

	}
}