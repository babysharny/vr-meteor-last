/**
 * Created by babysharny on 29.08.16.
 */

import {Component, Input} from "@angular/core";

import template from './game.component.html';
import styles from './game.component.css';


@Component({
  // moduleId: module.id,
  selector: 'app-game',
  template,
  styles
  // templateUrl: 'games-grid.component.html',
  // styleUrls: ['games-grid.component.css']
})

export class GameComponent {
  @Input game: any;
  constructor() {}
}
