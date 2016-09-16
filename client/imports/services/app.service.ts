/**
 * Created by babysharny on 07-Sep-16.
 */
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class AppService {

  right = {
    name: 'NEO',
    steamId: '76561198016668101',
    host: '192.168.88.48:81'
  };

  me = {
    name: 'SIMON',
    steamId: '76561198321699378',
    host: '192.168.1.69:81'
  };

  left = {
    name: 'SWITCH',
    steamId: '76561198314313838',
    host: '192.168.88.149:81'
  };

  constructor(
    private http: Http
  ) { }

}
