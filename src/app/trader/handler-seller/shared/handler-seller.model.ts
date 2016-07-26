import { Phone } from '../../../shared/phone.model';

export class HandlerSeller {

  /* Disabling no-string for processing object literal. */
  /* tslint:disable:no-string-literal */
  public static decode(handlerSellerJson: Object): HandlerSeller {

    let handlerSeller: HandlerSeller  = new HandlerSeller();
    handlerSeller.handlerId = handlerSellerJson['id'];
    handlerSeller.firstName = handlerSellerJson['firstName'];
    handlerSeller.lastName = handlerSellerJson['lastName'];
    handlerSeller.email = handlerSellerJson['emailAddressString'];
    let phoneNumberString = handlerSellerJson['phoneNumberString'];
    if (phoneNumberString != null) {
      handlerSeller.phone.phoneOne = phoneNumberString.substring(2, 5);
      handlerSeller.phone.phoneTwo = phoneNumberString.substring(5, 8);
      handlerSeller.phone.phoneThree = phoneNumberString.substring(8, 12);
    } else {
      handlerSeller.phone = null;
    }
    handlerSeller.companyName = handlerSellerJson['companyName'];
    return handlerSeller;
  }
  /* tslint:enable:no-string-literal */

  public handlerId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: Phone = new Phone();
  public companyName: string;

  // NOTE: Temporary hack to allow selection from list.
  //       Do not send, or expect to recieve, to/from server.
  public selected: boolean;

  public encode(): string {
    // NOTE: Play Framework won't recognize fields that aren't changed to
    //       String class. Unsure why.
    return JSON.stringify({
      'first_name': this.getString(this.firstName),
      'last_name': this.getString(this.lastName),
      'email_address': this.getString(this.email),
      'phone_number': this.phone.getAsString().toString(),
      'company_name': this.getString(this.companyName),
    });
  }

  private getString(field: string): String {
    return field != null
      ? field.toString()
      : '';
  }
}
