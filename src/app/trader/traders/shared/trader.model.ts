import { Phone } from '../../../shared/index';

  export class Trader {

  /* ===================================== Static Methods ===================================== */

  public static decode(traderJson: Object): Trader {
    let trader = new Trader();

    // trader.id = traderJson['id'];
    // trader.companyName = traderJson['companyName'];
    // trader.email = traderJson['emailAddress'];

    return trader;
  }

  /* ===================================== Member Fields ====================================== */

  public id: number;
  public firstName: string;
  public lastName: string;
  public companyName: string;
  public email: string;
  public phone: Phone;

  /* ===================================== Member Methods ===================================== */

}
