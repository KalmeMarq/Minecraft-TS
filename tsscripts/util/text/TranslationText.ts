import { langs } from '../../index.js';
import GameSettings from '../../client/GameSettings.js'

export default function translationText(translateKey: string) {
  if(langs) {
    const displayLang: any  = langs.find((id: any) => id['language.code'] === GameSettings.language);

    try {
      if(!displayLang[translateKey]) return translateKey;
      return displayLang[translateKey];

    } catch (err: any) {
      console.log(err)
    }
  }
}