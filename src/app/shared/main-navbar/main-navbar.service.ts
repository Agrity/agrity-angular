import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class NavBarService {

    public handlerLoggedIn: EventEmitter<boolean>;
    public traderLoggedIn: EventEmitter<boolean>;

    constructor() {
      this.handlerLoggedIn = new EventEmitter();
      this.traderLoggedIn = new EventEmitter();
    }

    public onTraderLoggedIn(bool: boolean): void {
      this.traderLoggedIn.emit(bool);
    }

    public onHandlerLoggedIn(bool: boolean): void {
      this.handlerLoggedIn.emit(bool);
    }
}
