import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

export class Logger {

  private ERROR_KEY: string = 'error';

  public handleHttpError(error: Response) {
    let errMsg = `${error.status} - ${error.statusText}`;
    //console.error('NEW ERROR: ' + error.json()[this.ERROR_KEY]);
    console.debug('WHOLE ERROR: ' + error);
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public handleError(error: string) {
    // TODO Implement.
  }

  public info(msg: string) {
    // TODO determine best logging method.
    // console.info('info: ' + msg);
  }
}
