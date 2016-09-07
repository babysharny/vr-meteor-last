import {Component, OnInit, Input, Inject} from '@angular/core';

import {GameComponent} from "./components/game.component";
import {GridPipe} from "./pipes/grid.pipe";

import {SessionService} from "../../services/session.service";
import {PlayersService} from "../../services/players.service";
import {GamesService} from "../../services/games.service";

import template from './games-grid.component.html';
import styles from './games-grid.component.css';

@Component({
  // moduleId: module.id,
  selector: 'app-games-grid',
  directives: [GameComponent],
  pipes: [GridPipe],
  template,
  styles
})
export class GamesGridComponent implements OnInit {
  @Input() games: any;
  selectedGame: any;

  constructor(
    @Inject(SessionService) private session: SessionService,
    @Inject(PlayersService) private remote: PlayersService,
    private gameService: GamesService
  ) { }

  ngOnInit() {
  }


  selectGame(game) {
    // Check started games

    if (!this.session.validatePlayers()) {
      alert('Add Players!');
      return;
    }

    if(this.selectedGame) {
      this.selectedGame.selected = false;
      this.remote.killApp(this.selectedGame.app);
    }

    game.selected = true;
    this.gameService.saveGame(game);
    // todo save game to mongo

    this.selectedGame = game;
    this.remote.startGame(game);

    if (!this.session.isStarted()) {
      this.session.nextState();
    }

  }

}
