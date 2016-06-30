import {Phone} from './phone';

export class User {
  grower_id: number;
  first_name: string;
  last_name: string;
  email: string; 
  phone: Phone = new Phone(); 

  // NOTE: Temporary hack to allow selection from list.
  //       Do not send, or expect to recieve, to server.
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

  static decode(userJson: Object): User {
    var user  = new User();
    user.grower_id = userJson['id'];
    user.first_name = userJson['firstName'];
    user.last_name = userJson['lastName'];

    var emailAddressStrings = userJson['emailAddressStrings'];
    if (emailAddressStrings != null) {
      // NOTE: Temporary hack until front-end supports multiple emails.
      var emailString: string = emailAddressStrings[0];
      user.email = emailString != undefined 
          ? emailString
          : null;
    } else {
      user.email = null;
    }

    var phoneNumberStrings = userJson['phoneNumsStrings'];
    if (phoneNumberStrings != null) {
      // NOTE: Temporary hack until front-end supports multiple emails.
      var phoneString: string = phoneNumberStrings[0];
      if (phoneString != undefined) {
        user.phone.phone_1 = phoneString.substring(2,5);
        user.phone.phone_2 = phoneString.substring(5,8);
        user.phone.phone_3 = phoneString.substring(8,12);
      } else {
        user.phone = null;
      }
    }  
    return user;
  }

  private getString(field: string): String {
    return field != null
      ? field.toString()
      : "";
  }
}
