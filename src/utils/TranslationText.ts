import { getResourceLocation } from './Resources.js';

export default class TranslationTextComponent {
  public translateKey;
  constructor(translateKey: string) {
    this.translateKey = translateKey;
  }

  get() {
    try {
      const lang = localStorage.getItem('GameSettings') && JSON.parse(localStorage.getItem('GameSettings')!).language ? JSON.parse(localStorage.getItem('GameSettings')!).language : 'en_us';
      const displayLang: any = getResourceLocation('langs', lang);
      
      if(!displayLang[this.translateKey] || displayLang[this.translateKey] === '') return String(this.translateKey);
      return displayLang[this.translateKey];
  
    } catch (err) {
      console.error(err)
    }
  }
}

export function getKeyTranslation(key: string) {
  try {
    const lang = localStorage.getItem('GameSettings') && JSON.parse(localStorage.getItem('GameSettings')!).language ? JSON.parse(localStorage.getItem('GameSettings')!).language : 'en_us';
    const displayLang: any = getResourceLocation('langs', lang);
    
    if(!displayLang[key] || displayLang[key] === '') return String(key);
    return displayLang[key];

  } catch (err) {
    console.error(err)
    return ''
  }
}