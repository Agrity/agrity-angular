import { HandlerSeller } from '../../handler-seller/shared/index';
import { BidStatus, BidResponse, ResponseStatus } from '../../../shared/index';

export class TraderBid {

  /* ===================================== Static Methods ===================================== */

    public static updateCountDownString(bid: TraderBid): void {
    if (!bid.currentlyOpen) {
       bid.countDownString = 'Bid Closed';
       return;
     }

    if (bid.timeToExpire <= 0) {
       bid.countDownString = 'Time Expired';
       return;
    }

    let days: number;
    let hours: number;
    let minutes: number;
    let seconds: number;
    days = Math.floor(bid.timeToExpire / 86400);
    bid.timeToExpire -= days * 86400;
    hours = Math.floor(bid.timeToExpire / 3600) % 24;
    bid.timeToExpire -= hours * 3600;
    minutes = Math.floor(bid.timeToExpire / 60) % 60;
    bid.timeToExpire -= minutes * 60;
    seconds = bid.timeToExpire % 60;
    bid.countDownString = [
            days + 'd',
            hours + 'h',
            minutes + 'm',
            seconds + 's',
            ].join(' ');
  }

  /* Disabling no-string for processing object literal. */
  /* tslint:disable:no-string-literal */
  public static decode(traderBidJson: Object): TraderBid {
    let traderBid  = new TraderBid();

    traderBid.bidId = traderBidJson['id'];

    traderBid.handlerSellerIds = [];
    let handlerSellers = traderBidJson['noResponseHandlerSellers'];
    if (handlerSellers != null) {
      for (let handlerIdx in handlerSellers) {
        traderBid.handlerSellerIds.push(handlerSellers[handlerIdx]['id']);
      }
    }

    traderBid.almondVariety = traderBidJson['almondVariety'];
    traderBid.almondSize = traderBidJson['almondSize'];
    traderBid.almondPounds = traderBidJson['almondPounds'];
    traderBid.pricePerPound = traderBidJson['pricePerPound'];
    traderBid.comment = traderBidJson['comment'];

    let bidStatus: string = traderBidJson['bidStatus'];

    switch (bidStatus) {
      case 'ACCEPTED':
        traderBid.bidStatus = BidStatus.ACCEPTED;
        traderBid.currentlyOpen = false;
        break;
      case 'REJECTED':
        traderBid.bidStatus = BidStatus.REJECTED;
        traderBid.currentlyOpen = false;
        break;
      case 'PARTIAL':
        traderBid.bidStatus = BidStatus.PARTIAL;
        traderBid.currentlyOpen = false;
        break;
      case 'OPEN':
        traderBid.bidStatus = BidStatus.OPEN;
        traderBid.currentlyOpen = true;
        break;
      default:
        traderBid.bidStatus = null;
        break;
    }

    traderBid.acceptedHandlerSellers =
        this.decodeTraderBidAcceptHandlerSellers(traderBidJson);
    traderBid.rejectedHandlerSellers =
        this.decodeTraderBidRejectHandlerSellers(traderBidJson);
    traderBid.noResponseHandlerSellers =
        this.decodeTraderBidNoResponseHandlerSellers(traderBidJson);

    traderBid.expirationTime = new Date(traderBidJson['expirationTimeAsString']);

    traderBid.bidResponses = this.decodeBidResponses(traderBidJson['bidResponses']);

    return traderBid;
  }
  /* tslint:enable:no-string-literal */

   public static decodeTraderBidAcceptHandlerSellers(traderBidJson: Object): HandlerSeller[] {
    return this.decodeTraderBidHandlerSellers('acceptedHandlerSellers', traderBidJson);
  }

  public static decodeTraderBidRejectHandlerSellers(traderBidJson: Object): HandlerSeller[] {
    return this.decodeTraderBidHandlerSellers('rejectedHandlerSellers', traderBidJson);
  }

  public static decodeTraderBidNoResponseHandlerSellers(traderBidJson: Object): HandlerSeller[] {
    return this.decodeTraderBidHandlerSellers('noResponseHandlerSellers', traderBidJson);
  }

  public static decodeBidResponses(bidResponsesJson: Object): BidResponse[] {
    let bidResponses: BidResponse[] = [];
    for (let bidResponseIndex in bidResponsesJson) {
      bidResponses.push(TraderBid.decodeBidResponse(bidResponsesJson[bidResponseIndex]));
    }

    return bidResponses;
  }

  /* Disabling no-string for processing object literal. */
  /* tslint:disable:no-string-literal */
  public static decodeBidResponse(bidJson: Object): BidResponse {
    let bidResponse: BidResponse = new BidResponse();
    let handlerSellerJson = bidJson['handlerSeller'];
    bidResponse.id = handlerSellerJson['id'];
    bidResponse.poundsAccepted = bidJson['poundsAccepted'];
    let responseStatus: string = bidJson['responseStatus'];

    switch (responseStatus) {
      case 'ACCEPTED':
        bidResponse.responseStatus = ResponseStatus.ACCEPTED;
        break;
      case 'NO_RESPONSE':
        bidResponse.responseStatus = ResponseStatus.NO_RESPONSE;
        break;
      case 'REJECTED':
        bidResponse.responseStatus = ResponseStatus.REJECTED;
        break;
      case 'PARTIAL':
        bidResponse.responseStatus = ResponseStatus.PARTIAL;
        break;
      default:
        bidResponse.responseStatus = null;
        break;
    }

    return bidResponse;
  }
  /* tslint:enable:no-string-literal */

  // TODO Should remove this and just have the bid model hold
  //      lists of Growers.
  private static decodeTraderBidHandlerSellers(
      handlersKey: string,
      traderBidJson: Object
      ): HandlerSeller[] {
    let handlerSellers: HandlerSeller[] = [];

    let handlersObject = traderBidJson[handlersKey];
    if (handlersObject != null) {
      for (let handlerIdx in handlersObject) {
        handlerSellers.push(HandlerSeller.decode(handlersObject[handlerIdx]));
      }
    }
    return handlerSellers;
  }

  /* ===================================== Member Fields ====================================== */

  public bidId: number;
  public almondVariety: string;
  public almondPounds: string;
  public almondSize: string;
  public pricePerPound: string;
  public comment: string;
  public delay: number;
  public currentlyOpen: boolean;
  public bidStatus: BidStatus;
  public bidResponses: BidResponse[];

  public handlerSellerIds: number[];
  public acceptedHandlerSellers: HandlerSeller[];
  public rejectedHandlerSellers: HandlerSeller[];
  public noResponseHandlerSellers: HandlerSeller[];

   public expirationTime: Date;

    // NOTE: Two extra variables to help the countdown clock.
  //       Do not send, or expect to recieve, to/from server.
  public timeToExpire: number;
  public countDownString: string;

  /* ===================================== Member Methods ===================================== */

  public encode(): string {
    return JSON.stringify({
      'handlerSeller_ids': this.handlerSellerIds,
      'almond_variety': this.getString(this.almondVariety),
      'almond_size': this.getString(this.almondSize),
      'almond_pounds': this.getString(this.almondPounds),
      'price_per_pound': this.getString(this.pricePerPound),
      'comment': this.getString(this.comment),

      // NOTE: Management Type currently always set to first come first serve.
      'management_type': {
        'type': 'FCFSService',
        'delay': this.delay,
      },
    });
  }

  public getBidResponse(bid: TraderBid, handlerId: number): BidResponse {
    for (let bidResponseIndex in bid.bidResponses) {
      let bidResponse: BidResponse = bid.bidResponses[bidResponseIndex];
      if (bidResponse.id === handlerId) {
        return bidResponse;
      }
    }
    return null;
  }

  private getString(field: string): String {
    return field != null
      ? field.toString()
      : '';
  }

}
