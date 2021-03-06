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
    grower.email = growerJson['emailAddressString'];
    let phoneNumberString = growerJson['phoneNumberString'];
    if (phoneNumberString != null) {
      grower.phone.phoneOne = phoneNumberString.substring(2, 5);
      grower.phone.phoneTwo = phoneNumberString.substring(5, 8);
      grower.phone.phoneThree = phoneNumberString.substring(8, 12);
    } else {
      grower.phone = null;
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
      'email_address': this.getString(this.email),
      'phone_number': this.phone.getAsString().toString(),
    });
  }

  private getString(field: string): String {
    return field != null
      ? field.toString()
      : '';
  }
}
