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

  //static decode(userJson: Object): User {
  //  var user  = new User();
  //  user.grower_id = userJson['id'];
  //  user.first_name = userJson['firstName'];
  //  user.last_name = userJson['lastName'];

  //  if (userJson['emailAddressStrings'] != null) {
  //    user.email = userJson['emailAddressStrings'][0];
  //  } else {
  //    user.phone = null;
  //  }

  //  if (userJson['phoneNumbers'] != null) {
  //    user.phone = userJson['phoneNumbers'][0];
  //  } else {
  //    user.phone = null;
  //  }

  //  return user;
  //}
}
