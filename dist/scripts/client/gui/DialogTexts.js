import TranslationTextComponent from '../../util/text/TranslationText.js';
export default class DialogTexts {
    static optionsEnabled(isEnabled) {
        return isEnabled ? DialogTexts.OPTIONS_ON : DialogTexts.OPTIONS_OFF;
    }
}
DialogTexts.TEST = new TranslationTextComponent("options.done").get();
DialogTexts.OPTIONS_ON = new TranslationTextComponent("options.on").get();
DialogTexts.OPTIONS_OFF = new TranslationTextComponent("options.off").get();
DialogTexts.GUI_DONE = new TranslationTextComponent("gui.done").get();
DialogTexts.GUI_CANCEL = new TranslationTextComponent("gui.cancel").get();
DialogTexts.GUI_YES = new TranslationTextComponent("gui.yes").get();
DialogTexts.GUI_NO = new TranslationTextComponent("gui.no").get();
DialogTexts.GUI_PROCEED = new TranslationTextComponent("gui.proceed").get();
DialogTexts.GUI_BACK = new TranslationTextComponent("gui.back").get();
DialogTexts.CONNECTION_FAILED = new TranslationTextComponent("connect.failed").get();
