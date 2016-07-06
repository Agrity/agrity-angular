import { Control } from '@angular/common';

export class CustomValidators {

    public static email(control: Control) {
        let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let valid: boolean = regEx.test(control.value);
        return valid ? null : { email: true };
    }

    public static isName(control: Control) {
      let regEx = /^[a-zA-Z ]+$/
      let valid: boolean = regEx.test(control.value) && control.value != null;
      return valid ? null : { name: true };
    }

    public static phoneThree(control: Control) {
      let regEx = /^\d{3}$/;
      let valid: boolean = regEx.test(control.value);
      return valid ? null : { 'phoneThree': true };
    }

    public static phoneFour(control: Control) {
      let regEx = /^\d{4}$/;
      let valid: boolean = regEx.test(control.value);
      return valid ? null : { 'phoneFour': true };
    }

    public static almondVariety(control: Control) {
      let valid = false;
      if (control.value === 'NONPAREIL' ||
          control.value === 'CARMEL' ||
          control.value === 'BUTTE' ||
          control.value === 'PADRE' ||
          control.value === 'MISSION' ||
          control.value === 'MONTEREY' ||
          control.value === 'SONORA' ||
          control.value === 'FRITZ' ||
          control.value === 'PRICE' ||
          control.value === 'PEERLESS'
          ) {
        valid = true;
      }
      return valid ? null : { 'almondVariety': true };
    }

    public static pricePerPound(control: Control) {
    //  var regEx = /-/;
      let valid: boolean = true; // regEx.test(control.value);
      return valid ? null : { 'pricePerPound': true };
    }

    // TODO: add size to form. 
    public static almondSize(control: Control) {
    //  var regEx = /-/;
      let valid: boolean = true; // regEx.test(control.value);
      return valid ? null : { almondSize: true };
    }

    public static almondPricePerPound(control: Control) {
    //  var regEx = /-/;
      let valid: boolean = true; // regEx.test(control.value);
      return valid ? null : { almondPricePerPound: true };
    }

    public static almondPounds(control: Control) {
    //  var regEx = /-/;
      let valid: boolean = true; // regEx.test(control.value);
      return valid ? null : { almondPounds: true };
    }

    public static startPaymentMonth(control: Control) {
      let valid: boolean = false;
      if (control.value === 'January' ||
          control.value === 'February' ||
          control.value === 'March' ||
          control.value === 'April' ||
          control.value === 'May' ||
          control.value === 'June' ||
          control.value === 'July' ||
          control.value === 'August' ||
          control.value === 'September' ||
          control.value === 'October' ||
          control.value === 'November' ||
          control.value === 'December'
          ) {
        valid = true;
      }
      return valid ? null : { 'startPaymentMonth': true };
    }

    public static startPaymentYear(control: Control) {
      let valid: boolean = false;
      if (control.value === '2016' ||
          control.value === '2017' ||
          control.value === '2018'
          ) {
        valid = true;
      }
      return valid ? null : { 'startPaymentYear': true };
    }

    public static endPaymentMonth(control: Control) {
      let valid: boolean = false;
      if (control.value === 'January' ||
          control.value === 'February' ||
          control.value === 'March' ||
          control.value === 'April' ||
          control.value === 'May' ||
          control.value === 'June' ||
          control.value === 'July' ||
          control.value === 'August' ||
          control.value === 'September' ||
          control.value === 'October' ||
          control.value === 'November' ||
          control.value === 'December'
          ) {
        valid = true;
      }
      return valid ? null : { 'endPaymentMonth': true };
    }

    public static endPaymentYear(control: Control) {
      let valid: boolean = false;
      if (control.value === '2016' ||
          control.value === '2017' ||
          control.value === '2018'
          ) {
        valid = true;
      }
      return valid ? null : { 'endPaymentYear': true };
    }

    public static delay(control: Control) {
    //  var regEx = /-/;
      let valid: boolean = true; // regEx.test(control.value);
      return valid ? null : { almondPounds: true };
    }

    public static comment(control: Control) {
    //  var regEx = /-/;
      let valid: boolean = true; // regEx.test(control.value);
      return valid ? null : { comment: true };
    }

}
