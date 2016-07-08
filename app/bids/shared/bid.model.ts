import { Grower } from '../../growers/shared/index';

export class Bid {
  bid_id: number;
  almondVariety: string;
  almondSize: string;
  almondPounds: string;
  pricePerPound: string;
  startPaymentMonth: string;
  startPaymentYear: string;
  endPaymentMonth: string;
  endPaymentYear: string;
  startPaymentDate: string;
  endPaymentDate: string;
  comment: string;

  managementType: string;
  managementTypeDelay: number;

  growerIds: number[];

  acceptedGrowers: Grower[];
  rejectedGrowers: Grower[];
  callRequestedGrowers: Grower[];
  noResponseGrowers: Grower[];

  currentlyOpen: boolean;


  encode(): string {
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

  static decode(bidJson: Object): Bid {
    var bid  = new Bid();
    
    bid.bid_id = bidJson['id'];

    bid.growerIds = []; 
    var growers = bidJson['noResponseGrowers'];
    if (growers != null) {
      for (var growerIdx in growers) {
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

  static decodeBidAcceptGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('acceptedGrowers', bidJson);
  }

  static decodeBidRejectGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('rejectedGrowers', bidJson);
  }

  static decodeBidCallRequestedGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('callRequestedGrowers', bidJson);
  }

  static decodeBidNoResponseGrowers(bidJson: Object): Grower[] {
    return this.decodeBidGrowers('noResponseGrowers', bidJson);
  }

  // TODO Should remove this and just have the bid model hold
  //      lists of Growers.
  private static decodeBidGrowers(growersKey: string, bidJson: Object): Grower[] {
    var growers: Grower[] = [];

    var growersObject = bidJson[growersKey];
    if (growersObject != null) {
      for (var growerIdx in growersObject) {
        growers.push(Grower.decode(growersObject[growerIdx])); 
      }
    } 
    return growers;
  }

  public getPaymentShort(){ 

    if (this.startPaymentDate !== null && this.endPaymentDate !== null) {
      var startMonth = this.startPaymentDate.substr(0, this.startPaymentDate.indexOf(' '));
      var startYear = this.startPaymentDate.substr(this.startPaymentDate.indexOf(' ')+1);
      var endMonth = this.endPaymentDate.substr(0, this.endPaymentDate.indexOf(' '));
      var endYear = this.endPaymentDate.substr(this.endPaymentDate.indexOf(' ')+1);

      var paymentDateString = this.monthToNumber(startMonth) + "/" + startYear + "  -  " + 
                                  this.monthToNumber(endMonth) + "/" + endYear;

      return paymentDateString; 
    }
    return "";
  }

  private monthToNumber(month: string): String {
    switch (month) {
    case "January":
      return "1";
    case "February":
      return "2";
    case "March":
      return "3";
    case "April":
      return "4";
    case "May":
      return "5";
    case "June":
      return "6";
    case "July":
      return "7";
    case "August":
      return "8";
    case "September":
      return "9";
    case "October":
      return "10";
    case "November":
      return "11"; 
    case "December":
      return "12";
    default:
      return "00";
  }

  }


  private getString(field: string): String {
    return field != null
      ? field.toString()
      : "";
  }
}
