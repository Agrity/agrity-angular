import { ResponseStatus } from './index';

export class BidResponse {
  public id: number;
  public responseStatus: ResponseStatus;
  public poundsAccepted: number;

  public getResponseStatus(): string {
    // if (this.responseStatus === ResponseStatus.ACCEPTED) {
    //   return 'Accepted in Full';
    // }
    if (this.responseStatus === ResponseStatus.ACCEPTED) { // will be partial
      return 'Accepted ' + this.poundsAccepted + ' lbs';
    }
    if (this.responseStatus === ResponseStatus.REJECTED) {
      return 'Rejected';
    }
    if (this.responseStatus === ResponseStatus.NO_RESPONSE) {
      return 'No Response';
    }
    return null;
  }
}
