/**
 * Created by babysharny on 23.08.16.
 */

export interface SessionObject {

  steam: string; // name of steam account

  startDate: string;
  endDate: string;

  time: string;   // time in game
  players: any[]; // name // phone
  games: any[];   // name of game
  discount: any;  // free mins // discount in prcent
  money: string;  // cash

}