import TranslationTextComponent from '../../util/text/TranslationText.js';

export default class DialogTexts {
  public static TEST = new TranslationTextComponent("options.done").get();
  public static OPTIONS_ON = new TranslationTextComponent("options.on").get();
  public static OPTIONS_OFF = new TranslationTextComponent("options.off").get();
  public static GUI_DONE = new TranslationTextComponent("gui.done").get();
  public static GUI_CANCEL = new TranslationTextComponent("gui.cancel").get();
  public static GUI_YES = new TranslationTextComponent("gui.yes").get();
  public static GUI_NO = new TranslationTextComponent("gui.no").get();
  public static GUI_PROCEED = new TranslationTextComponent("gui.proceed").get();
  public static GUI_BACK = new TranslationTextComponent("gui.back").get();
  public static CONNECTION_FAILED = new TranslationTextComponent("connect.failed").get();

  public static optionsEnabled(isEnabled: boolean) {
    return isEnabled ? DialogTexts.OPTIONS_ON : DialogTexts.OPTIONS_OFF;
  }
}