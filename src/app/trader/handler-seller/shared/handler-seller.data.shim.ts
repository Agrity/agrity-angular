import { HandlerSeller } from '../../handler-seller/shared/index';
import { Phone } from '../../../shared/index';

export class HandlerSellerData {

  public static mockHandlerSellers: HandlerSeller[] = HandlerSellerData
                                                          .createMockHandlerSellers();

  private static createMockHandlerSellers(): HandlerSeller[] {

    let handlerSellers: HandlerSeller[] = [
        HandlerSellerData.createMockHandlerSeller(),
        HandlerSellerData.createMockHandlerSeller(),
        HandlerSellerData.createMockHandlerSeller(),
        ];

    return handlerSellers;
  }

  private static createMockHandlerSeller(): HandlerSeller {

    let handlerSeller: HandlerSeller = new HandlerSeller();
    handlerSeller.handlerId = 0;
    handlerSeller.firstName = 'Jon';
    handlerSeller.lastName = 'Smith';
    handlerSeller.email = 'jsmithMock@gmail.com';
    handlerSeller.phone = new Phone();
    handlerSeller.phone.phoneOne = '559';
    handlerSeller.phone.phoneTwo = '111';
    handlerSeller.phone.phoneThree = '1111';
    handlerSeller.companyName = 'company';

    return handlerSeller;
  }

}
