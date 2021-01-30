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