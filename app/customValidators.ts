import {Control} from '@angular/common';

export class CustomValidators{

    static isName(control: Control){
      var regEx = /^[a-zA-Z ]+$/
      var valid = regEx.test(control.value) && control.value != null;
      return valid ? null : { name: true };   
    }

    static phone(control: Control){
      var regEx = /-/;
      var valid = true; // regEx.test(control.value);
      return valid ? null : { "phone": true };
    }

    static almondVariety(control: Control){
      var valid = false; 
      if (control.value == "NONPAREIL" ||
          control.value == "CARMEL" ||
          control.value == "BUTTE" ||
          control.value == "PADRE" ||
          control.value == "MISSION" ||
          control.value == "MONTEREY" ||
          control.value == "SONORA" ||
          control.value == "FRITZ" ||
          control.value == "PRICE" ||
          control.value == "PEERLESS"
          ){
        valid = true;
      }
      return valid ? null : { "almondVariety": true };
    }

    static pricePerPound(control: Control){
      var regEx = /-/;
      var valid = true; // regEx.test(control.value);
      return valid ? null : { "pricePerPound": true };
    }

    // TODO: add size to form. 
    static almondSize(control: Control){ 
      var regEx = /-/;
      var valid = true; // regEx.test(control.value);
      return valid ? null : { almondSize: true };
    }

    static almondPricePerPound(control: Control){
      var regEx = /-/;
      var valid = true; // regEx.test(control.value);
      return valid ? null : { almondPricePerPound: true };
    }

    static almondPounds(control: Control) {
      var regEx = /-/;
      var valid = true; // regEx.test(control.value);
      return valid ? null : { almondPounds: true };
    }

    static startPaymentMonth(control: Control) {
      var valid = false; 
      if (control.value == "January" ||
          control.value == "February" ||
          control.value == "March" ||
          control.value == "April" ||
          control.value == "May" ||
          control.value == "June" ||
          control.value == "July" ||
          control.value == "August" ||
          control.value == "September" ||
          control.value == "October" ||
          control.value == "November" ||
          control.value == "December"
          ){
        valid = true;
      }
      return valid ? null : { "startPaymentMonth": true };
    }
    
    static startPaymentYear(control: Control) {
      var valid = false; 
      if (control.value == "2016" ||
          control.value == "2017" ||
          control.value == "2018" 
          ){
        valid = true;
      }
      return valid ? null : { "startPaymentYear": true };
    }

    static endPaymentMonth(control: Control) {
    var valid = false; 
      if (control.value == "January" ||
          control.value == "February" ||
          control.value == "March" ||
          control.value == "April" ||
          control.value == "May" ||
          control.value == "June" ||
          control.value == "July" ||
          control.value == "August" ||
          control.value == "September" ||
          control.value == "October" ||
          control.value == "November" ||
          control.value == "December"
          ){
        valid = true;
      }
      return valid ? null : { "endPaymentMonth": true };
    }
    
    static endPaymentYear(control: Control) {
      var valid = false; 
      if (control.value == "2016" ||
          control.value == "2017" ||
          control.value == "2018" 
          ){
        valid = true;
      }
      return valid ? null : { "endPaymentYear": true };
    }

    static delay(control: Control) {
      var regEx = /-/;
      var valid = true; // regEx.test(control.value);
      return valid ? null : { almondPounds: true };
    }

    static comment(control: Control){ 
      var regEx = /-/;
      var valid = true; // regEx.test(control.value);
      return valid ? null : { comment: true };
    }

}
