import { Phone } from './index';

export class Grower {
  grower_id: number;
  first_name: string;
  last_name: string;
  email: string; 
  phone: Phone = new Phone(); 

  // NOTE: Temporary hack to allow selection from list.
  //       Do not send, or expect to recieve, to/from server.
  selected: boolean;

  encode(): string {
    // NOTE: Play Framework won't recognize fields that aren't changed to
    //       String class. Unsure why.
    return JSON.stringify({
      'first_name': this.getString(this.first_name),
      'last_name': this.getString(this.last_name),
      'email_addresses': [this.getString(this.email)],
      'phone_numbers': [this.phone.getAsString().toString()]
    });
  }

  static decode(growerJson: Object): Grower {
    var grower: Grower  = new Grower();
    grower.grower_id = growerJson['id'];
    grower.first_name = growerJson['firstName'];
    grower.last_name = growerJson['lastName'];

    var emailAddressStrings = growerJson['emailAddressStrings'];
    if (emailAddressStrings != null) {
      // NOTE: Temporary hack until front-end supports multiple emails.
      var emailString: string = emailAddressStrings[0];
      grower.email = emailString != null 
          ? emailString
          : null;
    } else {
      grower.email = null;
    }

    var phoneNumberStrings = growerJson['phoneNumsStrings'];
    if (phoneNumberStrings != null) {
      // NOTE: Temporary hack until front-end supports multiple emails.
      var phoneString: string = phoneNumberStrings[0];
      if (phoneString != null) {
        grower.phone.phone_1 = phoneString.substring(2,5);
        grower.phone.phone_2 = phoneString.substring(5,8);
        grower.phone.phone_3 = phoneString.substring(8,12);
      } else {
        grower.phone = null;
      }
    }  
    return grower;
  }

  private getString(field: string): String {
    return field != null
      ? field.toString()
      : "";
  }
}
