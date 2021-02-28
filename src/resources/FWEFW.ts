import Util from "@mcsrc/util/Util";

export default class Language {
  private languageCode: string;
  private region: string;
  private name: string;
  private bidirectional: boolean;

  constructor(languageCodeIn: string, regionIn: string, nameIn: string, bidirectionalIn: boolean) {
    this.languageCode = languageCodeIn;
    this.region = regionIn;
    this.name = nameIn;
    this.bidirectional = bidirectionalIn;
  }

  public getCode(): string {
    return this.languageCode;
  }

  public getName(): string {
    return this.name;
  }

  public getRegion(): string {
    return this.region;
  }

  public isBidirectional(): boolean {
    return this.bidirectional;
  }

  public toString(): string {
    return `${this.name} (${this.region})`;
  }

  public equals(object: any) {
    if(this == object) {
      return true;
    } else {
      return !(object instanceof Language) ? false : this.languageCode.equals((object).languageCode);
    }
  }

  public hashCode() {
    return Util.hashCode53(this.languageCode);
  }

  public compareTo(stringToCompare: Language) {
    return this.languageCode.localeCompare(stringToCompare.languageCode);
  }
}
