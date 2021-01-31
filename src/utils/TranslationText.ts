import { Resources } from '../index.js';

export default class TranslationTextComponent {
  public translateKey;
  constructor(translateKey: string) {
    this.translateKey = translateKey;
  }

  get() {
    try {
      const s = /* localStorage.getItem('GameSettings') ? JSON.parse(localStorage.getItem('GameSettings')!).languages :  */'en_us';
      const displayLang: any = Resources.languages.find((id: any) => id.code === s);
      
      if(!displayLang.data[this.translateKey] || displayLang.data[this.translateKey] === '') return String(this.translateKey);
      return displayLang.data[this.translateKey];
  
    } catch (err) {
      console.error(err)
    }
  }
}

export function getKeyTranslation(key: string) {
  try {
    const lang = localStorage.getItem('GameSettings') && JSON.parse(localStorage.getItem('GameSettings')!).language ? JSON.parse(localStorage.getItem('GameSettings')!).language : 'en_us';
    const displayLang: any = Resources.languages.find((id: any) => id.code === lang);
    
    if(!displayLang.data[key] || displayLang.data[key] === '') return String(key);
    return displayLang.data[key];

  } catch (err) {
    console.error(err)
    return ''
  }
}