import TranslationText from '../../util/text/TranslationText.js';

export default class DialogTexts {
  public static OPTIONS_ON = TranslationText("options.on");
  public static OPTIONS_OFF = TranslationText("options.off");
  public static GUI_DONE = ("gui.done");
  public static GUI_CANCEL = TranslationText("gui.cancel");
  public static GUI_YES = TranslationText("gui.yes");
  public static GUI_NO = TranslationText("gui.no");
  public static GUI_PROCEED = TranslationText("gui.proceed");
  public static GUI_BACK = TranslationText("gui.back");
  public static CONNECTION_FAILED = TranslationText("connect.failed");

  public static optionsEnabled(isEnabled: boolean) {
    return isEnabled ? DialogTexts.OPTIONS_ON : DialogTexts.OPTIONS_OFF;
  }
}
