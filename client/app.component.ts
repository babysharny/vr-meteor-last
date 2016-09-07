import {Component} from '@angular/core';

import {AdminPanelComponent} from "./imports/admin-panel/admin-panel.component";

import {HTTP_PROVIDERS} from "@angular/http";
import {AppService} from "./imports/services/app.service";

import template from './app.component.html';
import style from './app.component.css';

@Component({
  selector: 'app',
  // encapsulation: ViewEncapsulation.None,
  directives: [
    AdminPanelComponent
  ],
  providers: [
    HTTP_PROVIDERS,
    AppService
  ],
  template,
  style
})
export class AppComponent {

  constructor(
    private service: AppService
  ) { }
}
