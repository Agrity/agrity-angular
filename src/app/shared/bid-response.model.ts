import { ResponseStatus } from './index';

export class BidResponse {
  public id: number;
  public responseStatus: ResponseStatus;
  public poundsAccepted: number;

  public getResponseStatus(): string {
    if (this.responseStatus === ResponseStatus.ACCEPTED ||
        this.responseStatus === ResponseStatus.APPROVED) {
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

    public getResponseStatusTrader(): string {
    if (this.responseStatus === ResponseStatus.ACCEPTED ||
        this.responseStatus === ResponseStatus.APPROVED) {
      return 'Accepted ' + this.poundsAccepted + ' MT';
    }
    if (this.responseStatus === ResponseStatus.REJECTED) {
      return 'Rejected';
    }
    if (this.responseStatus === ResponseStatus.NO_RESPONSE) {
      return 'No Response';
    }
    if (this.responseStatus === ResponseStatus.PENDING) {
      return 'Pending: ' + this.poundsAccepted + ' MT';
    }
    if (this.responseStatus === ResponseStatus.DISAPPROVED) {
      return 'Disapproved: ' + this.poundsAccepted + ' MT';
    }
    return null;
  }
}
