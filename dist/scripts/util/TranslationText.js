import { Resources } from '../index.js';
export default class TranslationTextComponent {
    constructor(translateKey) {
        this.translateKey = translateKey;
    }
    get() {
        try {
            const displayLang = Resources.languages.find((id) => id.code === 'en_us');
            if (!displayLang.data[this.translateKey])
                return this.translateKey;
            return displayLang.data[this.translateKey];
        }
        catch (err) {
            console.error(err);
        }
    }
}
