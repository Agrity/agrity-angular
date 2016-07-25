import { EventEmitter, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class Logger {

  public errorEmitter: EventEmitter<string>;

  constructor() {
    this.errorEmitter = new EventEmitter<string>();
  }

  public handleHttpError(error: Response) {
    if (this.errorEmitter) {
      this.errorEmitter.emit('Error: ' + error);
    }
    console.error('ERROR: ' + error);
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
