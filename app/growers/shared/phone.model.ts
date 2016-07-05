export class Phone {
  phone_1: string;
  phone_2: string;
  phone_3: string;

  public getAsString(): String {
    if (this.phone_1 != null && this.phone_2 != null && this.phone_3 != null) {
    	return this.phone_1 + this.phone_2 + this.phone_3; 
    }
    return null; 
  }
}
