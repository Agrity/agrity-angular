import { Observable } from 'rxjs/Observable';

export class Logger {
  public handleHttpError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public handleError(error: string) {
    // TODO Implement.
  }
}
