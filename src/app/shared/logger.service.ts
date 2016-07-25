import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { EventEmitter } from '@angular/core';

export class Logger {

  public errorEmitter: EventEmitter<string>;

  constructor() {
    this.errorEmitter = new EventEmitter();
  }

  public handleHttpError(error: Response) {
    this.errorEmitter.emit('Error: ' + error);
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

}
