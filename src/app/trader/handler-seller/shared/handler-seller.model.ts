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
  public companyName: string;

  // NOTE: Temporary hack to allow selection from list.
  //       Do not send, or expect to recieve, to/from server.
  public selected: boolean;

  public encode(): string {
    return '';  // Does Nothing for now.
  }
}
