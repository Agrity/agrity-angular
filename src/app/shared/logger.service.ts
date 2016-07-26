<<<<<<< HEAD
import { Injectable } from '@angular/core';
=======
import { EventEmitter, Injectable } from '@angular/core';
>>>>>>> master
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from './index';
import 'rxjs/add/observable/throw';

@Injectable()
export class Logger {

  public errorEmitter: EventEmitter<string>;

  constructor(private config: Config) {
    this.errorEmitter = new EventEmitter<string>();
  };

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

  public debug(msg: string) {
    if (this.config.isDebug()) {
      /* tslint:disable:no-console */
      console.debug(msg);
      /* tslint:enable:no-console */
    }
  }
}
