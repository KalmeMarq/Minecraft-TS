import { langs } from '../../index.js';
import GameSettings from '../../client/GameSettings.js';
export default function translationText(translateKey) {
    if (langs) {
        const displayLang = langs.find((id) => id['language.code'] === GameSettings.language);
        try {
            if (!displayLang[translateKey])
                return translateKey;
            return displayLang[translateKey];
        }
        catch (err) {
            console.log(err);
        }
    }
}
