import { HandlerSeller } from './index';
import { BidStatus } from './index';

export class TraderBid {

  /* ===================================== Static Methods ===================================== */

    public static updateCountDownString(bid: TraderBid): void {
    if (!bid.currentlyOpen) {
       bid.countDownString = 'Offer Closed';
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

  public static decode(bidJson: Object): TraderBid {
    return new TraderBid(); // Does Nothing for now.
  }

  /* ===================================== Member Fields ====================================== */

  public bidId: number;
  public almondVariety: string;
  public almondPounds: string;
  public pricePerPound: string;
  public comment: string;
  public delay: number;
  public currentlyOpen: boolean;
  public bidStatus: BidStatus;

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
    return '';  // Does Nothing for now.
  }

}
