export class Handler {
  handlerId: number;
  companyName: string;
  email: string;

  static decode(handlerJson: Object): Handler {
    let handler = new Handler();

    handler.handlerId = handlerJson['id'];
    handler.companyName = handlerJson['companyName'];
    handler.email = handlerJson['emailAddress'];

    return handler;
  }

  public getString(field: string): String {
    return field != null
      ? field.toString()
      : '';
  }
}
