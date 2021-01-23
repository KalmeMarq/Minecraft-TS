import {Resources} from '../../index.js';
import GameSettings from '../../client/GameSettings.js'

export default function translationText(translateKey: string) {
  // if(localStorage.getItem('Resources')) {
    // const Resources: any = JSON.parse(localStorage.getItem('Resources')!);
  const displayLang: any = Resources.languages.find((id: any) => id['language.code'] === GameSettings.language);

  try {
    if(!displayLang[translateKey]) return translateKey;
    return displayLang[translateKey];

  } catch (err: any) {
    console.log(err)
  }
}