import { Grower } from '../../growers/shared/index';

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
    bid.managementTypeDelay = null;
    bid.startPaymentDate = bidJson['startPaymentDateAsString'];
    bid.endPaymentDate = bidJson['endPaymentDateAsString'];
    bid.comment = bidJson['comment'];
    bid.currentlyOpen = bidJson['offerCurrentlyOpen'];
    bid.acceptedGrowers = this.decodeBidAcceptGrowers(bidJson); 
    bid.acceptedGrowers = this.decodeBidRejectGrowers(bidJson); 
    bid.acceptedGrowers = this.decodeBidCallRequestedGrowers(bidJson); 
    bid.acceptedGrowers = this.decodeBidNoResponseGrowers(bidJson); 

    return bid;
  }
  /* tslint:enable:no-string-literal */

  public static decodeBidAcceptGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('acceptedGrowers', bidJson);
  }

  public static decodeBidRejectGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('rejectedGrowers', bidJson);
  }

  public static decodeBidCallRequestedGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('callRequestedGrowers', bidJson);
  }

  public static decodeBidNoResponseGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('noResponseGrowers', bidJson);
  }

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

  public managementType: string;
  public managementTypeDelay: number;

  public growerIds: number[];

  public acceptedGrowers: Grower[];
  public rejectedGrowers: Grower[];
  public callRequestedGrowers: Grower[];
  public noResponseGrowers: Grower[];

  public currentlyOpen: boolean;

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
        'type': this.getString(this.managementType),
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
