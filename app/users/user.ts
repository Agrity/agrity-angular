export class User {
  grower_id: number;
  first_name: string;
  last_name: string;
  email: string; 
  phone: string;

  // NOTE: Temporary hack to allow selection from list.
  //       Do not send, or expect to recieve, to server.
  selected: boolean;

  encode(): string {
    // NOTE: Play Framework won't recognize fields that aren't changed to
    //       String class. Unsure why.
    return JSON.stringify({
      'first_name': this.first_name.toString(),
      'last_name': this.last_name.toString(),
      'email_addresses': [this.email.toString()],
      'phone_numbers': [this.phone.toString()],
    });
  }

  static decode(userJson: Object): User {
    var user  = new User();
    user.grower_id = userJson['id'];
    user.first_name = userJson['firstName'];
    user.last_name = userJson['lastName'];

    var emailAddressStrings = userJson['emailAddressStrings'];
    if (emailAddressStrings != null) {
      // NOTE: Temporary hack until front-end supports multiple emails.
      var emailString: string = emailAddressStrings[0];
      user.email = emailString != undefined 
          ? emailString
          : null;
    } else {
      user.email = null;
    }

    var phoneNumberStrings = userJson['phoneNumbers'];
    if (phoneNumberStrings != null) {
      // NOTE: Temporary hack until front-end supports multiple emails.
      var phoneString: string = phoneNumberStrings[0];
      user.phone = phoneString != undefined 
          ? phoneString
          : null;
    } else {
      user.phone = null;
    }

    return user;
  }
}
