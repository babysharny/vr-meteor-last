import {Component, OnInit, Inject} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {TimeLeftPipe} from "./pipes/time-left.pipe";
import {PaymentPipe} from "./pipes/payment.pipe";
import template from './state-info.component.html';
import styles from './state-info.component.css';

    @Component({
  // moduleId: module.id,
  selector: 'app-state-info',
  pipes: [
    TimeLeftPipe,
    PaymentPipe
  ],
  template,
  styles
  // styleUrls: ['state-info.component.css']
})
export class StateInfoComponent implements OnInit {

  timeModeLeft = false;

  constructor(
    @Inject(SessionService) private session: SessionService
  ) { }

  ngOnInit() {
    console.log(this.session.timer.moment);
  }

  disableAdminMode() {
    this.session.toggleAdminMode();
  }

}
