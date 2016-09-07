/**
 * Created by babysharny on 06-Sep-16.
 */
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class AdminPanelService {

  showSettings = false;

  data: any;

  constructor(
    private http: Http
  ) { }

}
