import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../services/session.service";

import template from './state-switchers.component.html';
import styles from './state-switchers.component.css';

@Component({
  // moduleId: module.id,
  selector: 'app-state-switchers',
  template,
  styles
  // templateUrl: 'state-switchers.component.html',
  // styleUrls: ['state-switchers.component.css']
})
export class StateSwitchersComponent implements OnInit {

  constructor(
    private session: SessionService
  ) { }

  ngOnInit() {
  }

  setTime(minutes: number) {
    this.session.minutes = minutes;
  }

  setBonus(bonus: number) {
    if(this.session.freeMinutes == bonus) {
      this.session.freeMinutes = 0;
    }
    else {
      this.session.freeMinutes = bonus;
    }
  }

  setDiscount(discount: number) {
    if (this.session.discount == discount) {
      this.session.discount = 0;
    }
    else {
      this.session.discount = discount;
    }

  }

}
