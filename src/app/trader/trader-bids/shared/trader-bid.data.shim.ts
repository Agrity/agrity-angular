
import { TraderBid } from './index';
import { HandlerSeller } from '../../handler-seller/shared/index';
import { BidStatus, Phone } from '../../../shared/index';

export class TraderBidData {

  public static mockTraderBids: TraderBid[] = [
        TraderBidData.createMockTraderBid(BidStatus.OPEN),
        TraderBidData.createMockTraderBid(BidStatus.ACCEPTED),
        TraderBidData.createMockTraderBid(BidStatus.REJECTED),
        TraderBidData.createMockTraderBid(BidStatus.PARTIAL),
        TraderBidData.createMockTraderBid(BidStatus.OPEN),
        TraderBidData.createMockTraderBid(BidStatus.ACCEPTED),
        TraderBidData.createMockTraderBid(BidStatus.REJECTED),
        TraderBidData.createMockTraderBid(BidStatus.PARTIAL),
        ];

  private static createMockTraderBid(bidStatus: BidStatus): TraderBid {

    let traderBid: TraderBid = new TraderBid();
    traderBid.almondVariety = 'NONPAREIL';
    traderBid.almondPounds = '40/50 AOL';
    traderBid.pricePerPound = '2.50';
    traderBid.comment = 'This is a great mock comment.';
    traderBid.delay = 120;
    if (bidStatus === BidStatus.OPEN) {
      traderBid.currentlyOpen = true;
    } else {
      traderBid.currentlyOpen = false;
    }
    traderBid.bidStatus = bidStatus;
    traderBid.acceptedHandlerSellers = TraderBidData.createMockHandlerSellers();
    traderBid.rejectedHandlerSellers = TraderBidData.createMockHandlerSellers();
    traderBid.noResponseHandlerSellers = TraderBidData.createMockHandlerSellers();

    traderBid.expirationTime = new Date(2016, 7, 14);

    return traderBid;
  }

  private static createMockHandlerSellers(): HandlerSeller[] {

    let handlerSellers: HandlerSeller[] = [
        TraderBidData.createMockHandlerSeller(),
        TraderBidData.createMockHandlerSeller(),
        TraderBidData.createMockHandlerSeller(),
        ];

    return handlerSellers;
  }

  private static createMockHandlerSeller(): HandlerSeller {

    let handlerSeller: HandlerSeller = new HandlerSeller();
    handlerSeller.firstName = 'Jon';
    handlerSeller.lastName = 'Smith';
    handlerSeller.email = 'jsmithMock@gmail.com';
    handlerSeller.phone = new Phone();
    handlerSeller.phone.phoneOne = '559';
    handlerSeller.phone.phoneTwo = '111';
    handlerSeller.phone.phoneThree = '1111';

    return handlerSeller;
  }

}
