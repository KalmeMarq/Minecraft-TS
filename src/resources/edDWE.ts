import Language from "./FWEFW";

export default class LanguageManager {
  private static currentLang: Language = new Language("en_us", "US", "English", false);
  private currentLanguage: string;
  private language: Language = LanguageManager.currentLang;

  constructor(currLang: string) {
    this.currentLanguage = currLang;
  }

  public setCurrentLanguage(currentLanguageIn: Language): void {
    this.currentLanguage = currentLanguageIn.getCode();
    this.language = currentLanguageIn;
  }

  public getCurrentLanguage(): Language {
    return this.language;
  }
} 