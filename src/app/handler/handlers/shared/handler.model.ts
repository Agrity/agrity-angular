export class Handler {

  /* ===================================== Static Methods ===================================== */

  /* Disabling no-string for processing object literal. */
  /* tslint:disable:no-string-literal */
  public static decode(handlerJson: Object): Handler {
    let handler = new Handler();

    handler.handlerId = handlerJson['id'];
    handler.companyName = handlerJson['companyName'];
    handler.email = handlerJson['emailAddress'];

    return handler;
  }
  /* tslint:enable:no-string-literal */

  /* ===================================== Member Fields ====================================== */

  public handlerId: number;
  public companyName: string;
  public email: string;

  /* ===================================== Member Methods ===================================== */

  public getString(field: string): String {
    return field != null
      ? field.toString()
      : '';
  }
}
