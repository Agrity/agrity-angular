import { DatePipe } from '@angular/common';
import { Grower } from '../../growers/shared/index';
import { BidStatus, ResponseStatus, BidResponse, ManagementType } from '../../../shared/index';

export class Bid {

  /* ===================================== Static Methods ===================================== */

  /* Disabling no-string for processing object literal. */
  /* tslint:disable:no-string-literal */
  public static decode(bidJson: Object): Bid {
    let bid  = new Bid();

    bid.bidId = bidJson['id'];

    bid.growerIds = [];
    let growers = bidJson['noResponseGrowers'];
    if (growers != null) {
      for (let growerIdx in growers) {
        bid.growerIds.push(growers[growerIdx]['id']);
      }
    }

    bid.almondVariety = bidJson['almondVariety'];
    bid.almondSize = bidJson['almondSize'];
    bid.almondPounds = bidJson['almondPounds'];
    bid.pricePerPound = bidJson['pricePerPound'];
    bid.managementType = null;
    let managementString = bidJson['managementService'];
    if (managementString === 'services.bid_management.HandlerFCFSService') {
      bid.managementType = ManagementType.FCFS;
    }
    if (managementString === 'services.bid_management.HandlerSTFCService') {
      bid.managementType = ManagementType.STFC;
    }

    bid.managementTypeDelay = null;
    bid.startPaymentDate = bidJson['startPaymentDateAsString'];
    bid.endPaymentDate = bidJson['endPaymentDateAsString'];
    bid.comment = bidJson['comment'];

    bid.poundsRemaining = bidJson['poundsRemaining'];

    let bidStatus: string = bidJson['bidStatus'];

    switch (bidStatus) {
      case 'ACCEPTED':
        bid.bidStatus = BidStatus.ACCEPTED;
        bid.currentlyOpen = false;
        break;
      case 'REJECTED':
        bid.bidStatus = BidStatus.REJECTED;
        bid.currentlyOpen = false;
        break;
      case 'PARTIAL':
        bid.bidStatus = BidStatus.PARTIAL;
        bid.currentlyOpen = false;
        break;
      case 'OPEN':
        bid.bidStatus = BidStatus.OPEN;
        bid.currentlyOpen = true;
        break;
      default:
        bid.bidStatus = null;
        break;
    }

    bid.acceptedGrowers = this.decodeBidAcceptGrowers(bidJson);
    bid.rejectedGrowers = this.decodeBidRejectGrowers(bidJson);
    bid.callRequestedGrowers = this.decodeBidCallRequestedGrowers(bidJson);
    bid.pendingGrowers = this.decodePendingGrowers(bidJson);
    bid.disapprovedGrowers = this.decodeDisapprovedGrowers(bidJson);
    bid.expirationTime = new Date(bidJson['expirationTimeAsString']);
    bid.dateCreated = new Date(bidJson['createdAtAsString']);
    bid.noResponseGrowers = this.decodeBidNoResponseGrowers(bidJson);
    bid.allGrowers = bid.acceptedGrowers.concat(
        bid.rejectedGrowers).concat(bid.noResponseGrowers)
        .concat(bid.disapprovedGrowers).concat(bid.pendingGrowers);

    bid.bidResponses = this.decodeBidResponses(bidJson['bidResponses']);

    return bid;
  }
  /* tslint:enable:no-string-literal */

  public static updateCountDownString(bid: Bid): void {
    if (!bid.currentlyOpen) {
      bid.countDownString = new DatePipe().transform(bid.dateCreated, 'shortDate');
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

  public static decodeBidAcceptGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('acceptedGrowers', bidJson);
  }

  public static decodeBidRejectGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('rejectedGrowers', bidJson);
  }

  public static decodeBidCallRequestedGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('callRequestedGrowers', bidJson);
  }

  public static decodePendingGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('pendingGrowers', bidJson);
  }

  public static decodeDisapprovedGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('disapprovedGrowers', bidJson);
  }

  public static decodeBidNoResponseGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('noResponseGrowers', bidJson);
  }

  public static decodeBidResponses(bidResponsesJson: Object): BidResponse[] {
    let bidResponses: BidResponse[] = [];
    for (let bidResponseIndex in bidResponsesJson) {
      bidResponses.push(Bid.decodeBidResponse(bidResponsesJson[bidResponseIndex]));
    }

    return bidResponses;
  }

  /* Disabling no-string for processing object literal. */
  /* tslint:disable:no-string-literal */
  public static decodeBidResponse(bidJson: Object): BidResponse {
    let bidResponse: BidResponse = new BidResponse();
    let growerJson = bidJson['grower'];
    bidResponse.id = growerJson['id'];
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
      case 'PENDING':
        bidResponse.responseStatus = ResponseStatus.PENDING;
        break;
      case 'APPROVED':
        bidResponse.responseStatus = ResponseStatus.APPROVED;
        break;
      case 'DISAPPROVED':
        bidResponse.responseStatus = ResponseStatus.DISAPPROVED;
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
  private static decodeBidGrowers(growersKey: string, bidJson: Object): Grower[] {
    let growers: Grower[] = [];

    let growersObject = bidJson[growersKey];
    if (growersObject != null) {
      for (let growerIdx in growersObject) {
        growers.push(Grower.decode(growersObject[growerIdx]));
      }
    }
    return growers;
  }

  /* ===================================== Member Fields ====================================== */

  public bidId: number;
  public almondVariety: string;
  public almondSize: string;
  public almondPounds: string;
  public pricePerPound: string;
  public startPaymentMonth: string;
  public startPaymentYear: string;
  public endPaymentMonth: string;
  public endPaymentYear: string;
  public startPaymentDate: string;
  public endPaymentDate: string;
  public comment: string;

  public poundsRemaining: number;

  public managementType: ManagementType;
  public managementTypeDelay: number;

  public growerIds: number[];

  public acceptedGrowers: Grower[];
  public rejectedGrowers: Grower[];
  public callRequestedGrowers: Grower[];
  public noResponseGrowers: Grower[];
  public disapprovedGrowers: Grower[];
  public pendingGrowers: Grower[];
  public allGrowers: Grower[];

  public expirationTime: Date;
  public dateCreated: Date;

  public currentlyOpen: boolean;
  public bidStatus: BidStatus;

  public bidResponses: BidResponse[];

  // NOTE: Two extra variables to help the countdown clock.
  //       Do not send, or expect to recieve, to/from server.
  public timeToExpire: number;
  public countDownString: string;

  /* ===================================== Member Methods ===================================== */

  public encode(): string {
    // NOTE: Play Framework won't recognize fields that aren't changed to
    //       String class. Unsure why.
    return JSON.stringify({
      'grower_ids': this.growerIds,
      'almond_variety': this.getString(this.almondVariety),
      'almond_size': this.getString(this.almondSize),
      'almond_pounds': this.getString(this.almondPounds),
      'price_per_pound': this.getString(this.pricePerPound),
      'management_type': {
        'type': this.getString(this.getManagementString()),
        'delay': this.managementTypeDelay,
      },
      'start_payment_date': this.getString(this.startPaymentDate),
      'end_payment_date': this.getString(this.endPaymentDate),
      'comment': this.getString(this.comment),
    });
  }

  public getPaymentShort() {

    if (this.startPaymentDate !== null && this.endPaymentDate !== null) {
      let startMonth = this.startPaymentDate.substr(0, this.startPaymentDate.indexOf(' '));
      let startYear = this.startPaymentDate.substr(this.startPaymentDate.indexOf(' ') + 1);
      let endMonth = this.endPaymentDate.substr(0, this.endPaymentDate.indexOf(' '));
      let endYear = this.endPaymentDate.substr(this.endPaymentDate.indexOf(' ') + 1);

      let paymentDateString = this.monthToNumber(startMonth) + '/' + startYear + '  -  ' +
                                  this.monthToNumber(endMonth) + '/' + endYear;

      return paymentDateString;
    }
    return '';
  }

  public getManagementString(): string {
    if (this.managementType === ManagementType.FCFS) {
      return 'FCFSService';
    }
    if (this.managementType === ManagementType.STFC) {
      return 'STFCService';
    }
    return null;
  }

  public getBidResponse(bid: Bid, growerId: number): BidResponse {
    for (let bidResponseIndex in bid.bidResponses) {
      let bidResponse: BidResponse = bid.bidResponses[bidResponseIndex];
      if (bidResponse.id === growerId) {
        return bidResponse;
      }
    }
    return null;
  }

  private monthToNumber(month: string): String {
    switch (month) {
    case 'January':
      return '1';
    case 'February':
      return '2';
    case 'March':
      return '3';
    case 'April':
      return '4';
    case 'May':
      return '5';
    case 'June':
      return '6';
    case 'July':
      return '7';
    case 'August':
      return '8';
    case 'September':
      return '9';
    case 'October':
      return '10';
    case 'November':
      return '11';
    case 'December':
      return '12';
    default:
      return '00';
    }

  }

  private getString(field: string): String {
    return field != null
      ? field.toString()
      : '';
  }
}
