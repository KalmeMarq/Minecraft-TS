import { Resources } from '../../index.js';
import GameSettings from '../../client/GameSettings.js';
export function translationText(translateKey) {
    try {
        const displayLang = Resources.languages.find((id) => id['language.code'] === GameSettings.language);
        if (!displayLang[translateKey])
            return translateKey;
        return displayLang[translateKey];
    }
    catch (err) {
        console.error(err);
    }
}
export default class TranslationTextComponent {
    constructor(translateKey) {
        this.translateKey = translateKey;
    }
    get() {
        try {
            const displayLang = Resources.languages.find((id) => id['language.code'] === GameSettings.language);
            if (!displayLang[this.translateKey])
                return this.translateKey;
            return displayLang[this.translateKey];
        }
        catch (err) {
            console.error(err);
        }
    }
}
