import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeLeft'
})
export class TimeLeftPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return ;
    let isLeft =   args[0];
    let fullTime = args[1];
    let freeTime = args[2];


    if(isLeft) {
      value = fullTime - value;
      value = Math.abs(value);
    }

    let sec_num = parseInt(''+value, 10); // don't forget the second param
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    let hS = '' + hours;
    let mS = '' + minutes;
    let sS = '' + seconds;

    if (hours   < 10) {hS   = '0' + hours;}
    if (minutes < 10) {mS = '0' + minutes;}
    if (seconds < 10) {sS = '0' + seconds;}

    // if (isLeft) {
    //   return ''+fullTime;
    // }
    if (hours) {
      return hS+':'+mS;
    }
    return mS+':'+sS;
  }
}
