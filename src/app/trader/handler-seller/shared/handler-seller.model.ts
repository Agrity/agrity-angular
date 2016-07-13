import { Phone } from '../../../shared/phone.model';

export class HandlerSeller {

  public static decode(bidJson: Object): HandlerSeller {
    return new HandlerSeller(); // Does Nothing for now.
  }

  public handlerId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: Phone = new Phone();

  public encode(): string {
    return '';  // Does Nothing for now.
  }
}
