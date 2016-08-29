/**
 * Created by babysharny on 29.08.16.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grid'
})
export class GridPipe implements PipeTransform {


  transform(games: any, cols?: number): any {
    console.log('GAMES', games);
    return [games, games];
  }
}
