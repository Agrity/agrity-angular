import { Phone } from './index';

export class Grower {

  /* ===================================== Static Methods ===================================== */

  /* Disabling no-string for processing object literal. */
  /* tslint:disable:no-string-literal */
  public static decode(growerJson: Object): Grower {
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
  /* tslint:enable:no-string-literal */

  /* ===================================== Member Fields ====================================== */

  public growerId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: Phone = new Phone();

  // NOTE: Temporary hack to allow selection from list.
  //       Do not send, or expect to recieve, to/from server.
  public selected: boolean;

  /* ===================================== Member Methods ===================================== */

  public encode(): string {
    // NOTE: Play Framework won't recognize fields that aren't changed to
    //       String class. Unsure why.
    return JSON.stringify({
      'first_name': this.getString(this.firstName),
      'last_name': this.getString(this.lastName),
      'email_addresses': [this.getString(this.email)],
      'phone_numbers': [this.phone.getAsString().toString()],
    });
  }

  private getString(field: string): String {
    return field != null
      ? field.toString()
      : '';
  }
}
