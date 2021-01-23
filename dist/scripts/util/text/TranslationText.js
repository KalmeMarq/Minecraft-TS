import { Resources } from '../../index.js';
import GameSettings from '../../client/GameSettings.js';
export default function translationText(translateKey) {
    const displayLang = Resources.languages.find((id) => id['language.code'] === GameSettings.language);
    try {
        if (!displayLang[translateKey])
            return translateKey;
        return displayLang[translateKey];
    }
    catch (err) {
        console.log(err);
    }
}
