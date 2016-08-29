import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payment'
})
export class PaymentPipe implements PipeTransform {


  transform(time: any, args?: any): any {

    // time = 15*60;


    let bonusTime = args[0];
    let discount =  args[1];



    if (time <= bonusTime) {
      return '0';
    }

    time -= bonusTime;

    let priceList = {
      min15:  350,
      min30:  650,
      min45:  800,
      min60: 1000,
    };

    let secondPrice = 0;
    if (time <= 15*60) {
      secondPrice = priceList.min15 / 15 / 60;
    }
    else if (time <= 30*60) {
      secondPrice = priceList.min30 / 30 / 60;
    }
    else if (time <= 45*60) {
      secondPrice = priceList.min45 / 45 / 60;
    }
    else {
      secondPrice = priceList.min60 / 60 / 60;
    }

    if (discount > 0) {
      secondPrice -= secondPrice*discount/100;
    }

    return Math.floor(time * secondPrice);

    // return ''+time+' '+bonusTime/60+ ' '+discount;
  }

}
