import { EventEmitter, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from './index';
import 'rxjs/add/observable/throw';

@Injectable()
export class Logger {

  public modalEmitter: EventEmitter<string>;

  constructor(private config: Config) {
    this.modalEmitter = new EventEmitter<string>();
  };

  public handleHttpError(error: Response) {
    if (this.modalEmitter) {
      this.modalEmitter.emit('Error: ' + error);
    }
    console.error('ERROR: ' + error);
    return Observable.throw(error);
  }

  public handleError(error: string) {
    // TODO Implement.
  }

  public alert(message: string) {
    if (this.modalEmitter) {
      this.modalEmitter.emit(message);
    }
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
