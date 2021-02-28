import TranslationTextComponent from "@mcsrc/util/text/TranslationTextComponent";

export default class DialogTexts {
  public static OPTIONS_ON: TranslationTextComponent = new TranslationTextComponent("options.on");
  public static OPTIONS_OFF: TranslationTextComponent = new TranslationTextComponent("options.off");
  public static GUI_DONE: TranslationTextComponent = new TranslationTextComponent("gui.done");
  public static GUI_CANCEL: TranslationTextComponent = new TranslationTextComponent("gui.cancel");
  public static GUI_YES: TranslationTextComponent = new TranslationTextComponent("gui.yes");
  public static GUI_NO: TranslationTextComponent = new TranslationTextComponent("gui.no");
  public static GUI_PROCEED: TranslationTextComponent = new TranslationTextComponent("gui.proceed");
  public static GUI_BACK: TranslationTextComponent = new TranslationTextComponent("gui.back");
  public static CONNECTION_FAILED: TranslationTextComponent = new TranslationTextComponent("connect.failed");

  public static optionsEnabled(isEnabled: boolean): TranslationTextComponent {
    return isEnabled ? DialogTexts.OPTIONS_ON : DialogTexts.OPTIONS_OFF;
  }
}