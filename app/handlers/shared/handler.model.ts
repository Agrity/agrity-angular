export class Handler {
  handlerId: number;
  companyName: string;
  email: string;


  /* Disabling no-string for processing object literal. */
  /* tslint:disable:no-string-literal */
  static decode(handlerJson: Object): Handler {
    let handler = new Handler();

    handler.handlerId = handlerJson['id'];
    handler.companyName = handlerJson['companyName'];
    handler.email = handlerJson['emailAddress'];

    return handler;
  }
  /* tslint:enable:no-string-literal */

  public getString(field: string): String {
    return field != null
      ? field.toString()
      : '';
  }
}
