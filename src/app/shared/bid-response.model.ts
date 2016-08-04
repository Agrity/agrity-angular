import { ResponseStatus } from './index';

export class BidResponse {
  public id: number;
  public responseStatus: ResponseStatus;
  public poundsAccepted: number;

  public getResponseStatus(): string {
    if (this.responseStatus === ResponseStatus.ACCEPTED) {
      return 'Accepted ' + this.poundsAccepted + ' lbs';
    }
    if (this.responseStatus === ResponseStatus.REJECTED) {
      return 'Rejected';
    }
    if (this.responseStatus === ResponseStatus.NO_RESPONSE) {
      return 'No Response';
    }
    if (this.responseStatus === ResponseStatus.PENDING) {
      return 'Pending: ' + this.poundsAccepted + ' lbs';
    }
    if (this.responseStatus === ResponseStatus.DISAPPROVED) {
      return 'Disapproved: ' + this.poundsAccepted + ' lbs';
    }
    return null;
  }
}
