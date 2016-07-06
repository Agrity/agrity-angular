export class Handler {
  handler_id: number;
  company_name: string; 
  email: string;

  static decode(handlerJson: Object): Handler {
    var handler = new Handler();
    
    handler.handler_id = handlerJson['id'];
    handler.company_name = handlerJson['companyName'];
    handler.email = handlerJson['emailAddress'];

    return handler;
  }

  private getString(field: string): String {
    return field != null
      ? field.toString()
      : "";
  }
}
