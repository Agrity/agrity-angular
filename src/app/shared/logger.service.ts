import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from './index';
import 'rxjs/add/observable/throw';

@Injectable()
export class Logger {

  constructor(private config: Config) {};

  public handleHttpError(error: Response) {
    // let errMsg = `${error.status} - ${error.statusText}`;
    console.error('Error: ' + error);
    return Observable.throw(error);
  }

  public handleError(error: string) {
    // TODO Implement.
  }

  public info(msg: string) {
    // TODO determine best logging method.
    // console.info('info: ' + msg);
  }

  public debug(msg: string) {
    if (this.config.isDebug()) {
      /* tslint:disable:no-console */
      console.debug(msg);
      /* tslint:enable:no-console */
    }
  }
}
