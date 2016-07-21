import { Phone } from '../../../shared/index';

  export class Trader {

  /* ===================================== Static Methods ===================================== */

  /* Disabling no-string for processing object literal. */
  /* tslint:disable:no-string-literal */
  public static decode(traderJson: Object): Trader {
    let trader = new Trader();

    trader.id = traderJson['id'];
    trader.companyName = traderJson['companyName'];
    trader.email = traderJson['emailAddressString'];

    return trader;
  }
  /* tslint:enable:no-string-literal */

  /* ===================================== Member Fields ====================================== */

  public id: number;
  public firstName: string;
  public lastName: string;
  public companyName: string;
  public email: string;
  public phone: Phone;

  /* ===================================== Member Methods ===================================== */

  public getString(field: string): String {
    return field != null
      ? field.toString()
      : '';
  }

}
