import Language from './Language'
import LanguageMetadataSectionSerializer from './LanguageMetadataSectionSerializer'

export default class LanguageMetadataSection {
  public static SERIALIZER: LanguageMetadataSectionSerializer = new LanguageMetadataSectionSerializer()
  private readonly languages: Language[]

  public constructor (langs: Language[]) {
    this.languages = langs
  }

  public getLanguages (): Language[] {
    return this.languages
  }
}
