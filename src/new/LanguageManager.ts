import Language from '@mcsrc/resources/FWEFW';
import Util from '@mcsrc/util/Util';
import ResourceLocation from './ResourceLocation';

export default class LanguageManager {
  private static defaultLanguage: Language = new Language('en_us', 'US', 'English', false);
  private languageMap = new Map<string, Language>([['en_us', LanguageManager.defaultLanguage]]);
  private clientLanguageMap = new Map<string, { [key: string]: string }>();

  constructor() {
  }

  public async reload(): Promise<void> {
    let map = new Map<string, Language>();
    const languageSection = await fetch('./resources/assets/pack.mcmeta')
      .then(res => res.json())
      .then(data => data.language)
  
    Object.entries(languageSection).map(async(language: any) => {
      map.set(language[0], new Language(language[0], language[1].region, language[1].name, language[1].bidirectional));
    })

    this.languageMap = map;

    let clientMap = new Map<string, { [key: string]: string }>();
    this.languageMap.forEach(async(language) => {
      const loc = new ResourceLocation(Util.formatString('lang/%s.json', language.getCode()));
      return await fetch(loc.getFullPath())
        .then(res => res.json())
        .then(data => {
          clientMap.set(language.getCode(), data);
        })
    })

    this.clientLanguageMap = clientMap;
  }

  public getTranslation(translationKey: string) {
    return this.clientLanguageMap.get('en_us')![translationKey];
  }

  public getLanguages(): Set<Language> {
    return new Set(this.languageMap.values());
  }

  public getLanguage(language: string): Language {
    return this.languageMap.get(language)!;
  }

  /** @Deprecated */
  public getLanguageData(name: string) {
    return this.clientLanguageMap.get(name)!;
  }
}