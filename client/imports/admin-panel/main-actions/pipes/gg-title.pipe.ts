/**
 * Created by babysharny on 07-Sep-16.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ggTitle'
})
export class GgTitlePipe implements PipeTransform {


  transform(state: any, args?: any): any {

    console.log('State', state);
    if (state == 1) {
      return 'Start!';
    }
    else if(state == 2) {
      return 'GG';
    }
    else if(state == 3) {
      return 'Clear';
    }
    return 'State is '+state;
  }
}
