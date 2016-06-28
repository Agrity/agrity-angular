import { Injectable } from '@angular/core';

@Injectable()
export class Config {
  public getServerDomain(): string {
    return 'http://localhost:9000';
  }

  public getHandlerAuthHeaderKey(): string {
    return 'X-HANDLER-TOKEN';

  }
}
