/**
 * Created by babysharny on 07-Sep-16.
 */
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import {Remotes} from "../../../both/collections/remotes.collection";
import {Games} from "../../../both/collections/games.collection";

@Injectable()
export class AppService {

  right: any;
  left: any;
  me: any;
  // right = {
  //   name: 'NEO',
  //   steamId: '76561198016668101',
  //   host: '192.168.88.48:81'
  // };

  // me = {
  //   name: 'SIMON',
  //   steamId: '76561198321699378',
  //   host: '192.168.1.69:81'
  // };

  // left = {
  //   name: 'SWITCH',
  //   steamId: '76561198314313838',
  //   host: '192.168.88.149:81'
  // };

  constructor(
    private http: Http
  ) {
    // Meteor.subscribe("remotes", function(){
    //   console.log(states, states.find(), states.find().fetch());
    // });
    setTimeout((x) => {
      console.log('INTERVAL');
      this.right = Remotes.findOne({'name': 'NEO'});
      this.left = Remotes.findOne({'name': 'SWITCH'});
      this.me = Remotes.findOne({'name': 'SIMON'});
      console.log('Right: ', this.right);

    }, 1000);
    return;
  }

}
