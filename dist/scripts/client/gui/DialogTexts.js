import TranslationText from '../../util/text/TranslationText.js';
export default class DialogTexts {
    static optionsEnabled(isEnabled) {
        return isEnabled ? DialogTexts.OPTIONS_ON : DialogTexts.OPTIONS_OFF;
    }
}
DialogTexts.OPTIONS_ON = TranslationText("options.on");
DialogTexts.OPTIONS_OFF = TranslationText("options.off");
DialogTexts.GUI_DONE = ("gui.done");
DialogTexts.GUI_CANCEL = TranslationText("gui.cancel");
DialogTexts.GUI_YES = TranslationText("gui.yes");
DialogTexts.GUI_NO = TranslationText("gui.no");
DialogTexts.GUI_PROCEED = TranslationText("gui.proceed");
DialogTexts.GUI_BACK = TranslationText("gui.back");
DialogTexts.CONNECTION_FAILED = TranslationText("connect.failed");
