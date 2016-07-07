import { Phone } from './index';

export class Grower {
  growerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: Phone = new Phone();

  // NOTE: Temporary hack to allow selection from list.
  //       Do not send, or expect to recieve, to/from server.
  selected: boolean;

  encode(): string {
    // NOTE: Play Framework won't recognize fields that aren't changed to
    //       String class. Unsure why.
    return JSON.stringify({
      'first_name': this.getString(this.firstName),
      'last_name': this.getString(this.lastName),
      'email_addresses': [this.getString(this.email)],
      'phone_numbers': [this.phone.getAsString().toString()],
    });
  }

  static decode(growerJson: Object): Grower {
    let grower: Grower  = new Grower();
    grower.growerId = growerJson['id'];
    grower.firstName = growerJson['firstName'];
    grower.lastName = growerJson['lastName'];

    let emailAddressStrings = growerJson['emailAddressStrings'];
    if (emailAddressStrings != null) {
      // NOTE: Temporary hack until front-end supports multiple emails.
      let emailString: string = emailAddressStrings[0];
      grower.email = emailString != null
          ? emailString
          : null;
    } else {
      grower.email = null;
    }

    let phoneNumberStrings = growerJson['phoneNumsStrings'];
    if (phoneNumberStrings != null) {
      // NOTE: Temporary hack until front-end supports multiple emails.
      let phoneString: string = phoneNumberStrings[0];
      if (phoneString != null) {
        grower.phone.phoneOne = phoneString.substring(2, 5);
        grower.phone.phoneTwo = phoneString.substring(5, 8);
        grower.phone.phoneThree = phoneString.substring(8, 12);
      } else {
        grower.phone = null;
      }
    }
    return grower;
  }

  private getString(field: string): String {
    return field != null
      ? field.toString()
      : '';
  }
}
