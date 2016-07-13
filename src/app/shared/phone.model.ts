export class Phone {
  public phoneOne: string;
  public phoneTwo: string;
  public phoneThree: string;

  public getAsString(): String {
    if (this.phoneOne != null && this.phoneTwo != null && this.phoneThree != null) {
      return this.phoneOne + '-' + this.phoneTwo + '-' + this.phoneThree;
    }
    return null;
  }
}
