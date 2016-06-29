export class Bid {
  bid_id: number;
  almondVariety: String;
  almondPounds: String;
  pricePerPound: String;
  paymentDate: String;
  comment: String;

  managementType: String;
  managementTypeDelay: number;

  growerIds: [number];

  acceptedGrowers: [number];
  rejectedGrowers: [number];
  callRequestedGrowers: [number];
  noResponseGrowers: [number];

  currentlyOpen: boolean;


  encode(): string {
    // NOTE: Play Framework won't recognize fields that aren't changed to
    //       String class. Unsure why.
    return JSON.stringify({
      'grower_ids': this.growerIds,
      'almond_variety': this.almondVariety,
      'almond_pounds': this.almondPounds,
      'price_per_pound': this.pricePerPound,
      'management_type': {
        'type': this.managementType,
        'delay': this.managementTypeDelay
      },
      'payment_date': this.paymentDate,
      'comment': this.comment,
    });
  }

  static decode(bidJson: Object): Bid {
    var bid  = new Bid();

    bid.growerIds = [];
    var growers = bidJson['noResponseGrowers'];
    if (growers != null) {
      for (var grower in growers) {
        bid.growerIds.push(grower['id']); 
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
}
