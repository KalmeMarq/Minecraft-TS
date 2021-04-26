import Util from '../util/Util'

export default class Language {
  private readonly languageCode: string
  private readonly region: string
  private readonly name: string
  private readonly bidirectional: boolean

  constructor (languageCodeIn: string, regionIn: string, nameIn: string, bidirectionalIn: boolean) {
    this.languageCode = languageCodeIn
    this.region = regionIn
    this.name = nameIn
    this.bidirectional = bidirectionalIn
  }

  public getCode (): string {
    return this.languageCode
  }

  public getName (): string {
    return this.name
  }

  public getRegion (): string {
    return this.region
  }

  public isBidirectional (): boolean {
    return this.bidirectional
  }

  public toString (): string {
    return `${this.name} (${this.region})`
  }

  public equals (object: any): boolean {
    if (this === object) return true
    else return !(object instanceof Language) ? false : Util.equals(this.languageCode, (object).languageCode)
  }

  public compareTo (stringToCompare: Language): number {
    return this.languageCode.localeCompare(stringToCompare.languageCode)
  }
}
