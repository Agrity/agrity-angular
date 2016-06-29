export class Bid {
  bid_id: number;
  almondVariety: string;
  almondPounds: string;
  pricePerPound: string;
  paymentDate: string;
  comment: string;

  managementType: string;
  managementTypeDelay: number;

  growerIds: number[];

  acceptedGrowers: number[];
  rejectedGrowers: number[];
  callRequestedGrowers: number[];
  noResponseGrowers: number[];

  currentlyOpen: boolean;


  encode(): string {
    // NOTE: Play Framework won't recognize fields that aren't changed to
    //       String class. Unsure why.
    return JSON.stringify({
      'grower_ids': this.growerIds,
      'almond_variety': this.getString(this.almondVariety),
      'almond_pounds': this.getString(this.almondPounds),
      'price_per_pound': this.getString(this.pricePerPound),
      'management_type': {
        'type': this.getString(this.managementType),
        'delay': this.managementTypeDelay,
      },
      'payment_date': this.getString(this.paymentDate),
      'comment': this.getString(this.comment),
    });
  }

  static decode(bidJson: Object): Bid {
    var bid  = new Bid();
    bid.growerIds = []; 
    var growers = bidJson['noResponseGrowers'];
    if (growers != null) {
      for (var growerIdx in growers) {
        bid.growerIds.push(growers[growerIdx]['id']); 
      }
    } 

    bid.almondVariety = bidJson['almondVariety'];
    bid.almondPounds = bidJson['almondPounds'];
    bid.pricePerPound = bidJson['pricePerPound'];
    bid.managementType = null;
    bid.managementTypeDelay = null;
    bid.paymentDate = bidJson['paymentDate'];
    bid.comment = bidJson['comment'];

    return bid;
  }

  private getString(field: string): String {
    return field != null
      ? field.toString()
      : "";
  }
}
