import {Component, OnInit, Input, Inject} from '@angular/core';
import template from './games-grid.component.html';
import styles from './games-grid.component.css';
import {GridPipe} from "./pipes/grid.pipe";
import {GameComponent} from "./components/game.component";
import {Games} from "../../../../both/collections/games.collection";
import {SessionService} from "../../services/session.service";
import {PlayersService} from "../../services/players.service";
@Component({
  // moduleId: module.id,
  selector: 'app-games-grid',
  directives: [GameComponent],
  pipes: [GridPipe],
  template,
  styles
  // templateUrl: 'games-grid.component.html',
  // styleUrls: ['games-grid.component.css']
})
export class GamesGridComponent implements OnInit {
  @Input() games: any;
  selectedGame: any;

  constructor(
    @Inject(SessionService) private session: SessionService,
    @Inject(PlayersService) private remote: PlayersService
  ) { }

  ngOnInit() {
  }


  selectGame(game) {
    if(this.selectedGame) {
      this.selectedGame.selected = false;
      this.remote.killApp(this.selectedGame.app);
    }
    game.selected = true;
    this.selectedGame = game;

    this.session.startTimer();
    this.remote.startGame(game);
    // this.games.forEach(g => {
    //   g.selected = false;
    // });
    // Games.find({
    //   selected: true
    // });

    // Games.update({
    //     selected: true
    // }, {
    //   set: {
    //     selected: false
    //   },
    // });

    // Games.update({
    //   _id: game._id
    // }, {
    //   set: {
    //     selected: true
    //   },
    // });

    // game.selected = true;
  }

}
