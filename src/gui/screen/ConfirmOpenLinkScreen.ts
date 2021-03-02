import TranslationTextComponent from "@mcsrc/util/text/TranslationTextComponent";
import DialogTexts from "../DialogTexts";
import Button from "../widgets/button/Button";
import { ConfirmScreen } from "./ConfirmScreen";

export class ConfirmOpenLinkScreen extends ConfirmScreen {
  private openLinkWarning: string;
  private copyLinkButtonText: string;
  private linkText: string;
  private showSecurityWarning: boolean;

  constructor(callback: (b: boolean) => void, p_i51121_2_: string, p_i51121_3_: boolean) {
    super(callback, new TranslationTextComponent(p_i51121_3_ ? "chat.link.confirmTrusted" : "chat.link.confirm").getTranslatedKey(), p_i51121_2_);
    this.confirmButtonText = (p_i51121_3_ ? new TranslationTextComponent("chat.link.open").getTranslatedKey() : DialogTexts.GUI_YES.getTranslatedKey());
    this.cancelButtonText = p_i51121_3_ ? DialogTexts.GUI_CANCEL.getTranslatedKey() : DialogTexts.GUI_NO.getTranslatedKey();
    this.copyLinkButtonText = new TranslationTextComponent("chat.copy").getTranslatedKey();
    this.openLinkWarning = new TranslationTextComponent("chat.link.warning").getTranslatedKey();
    this.showSecurityWarning = !p_i51121_3_;
    this.linkText = p_i51121_2_;
  }

  protected init(): void {
    super.init();
    this.buttons = [];
    this.children = [];
    this.addButton(new Button(this.width / 2 - 50 - 105, this.height / 6 + 96, 100, 20, this.confirmButtonText, (button) => {
        this.callbackFunction(true);
    }));
    this.addButton(new Button(this.width / 2 - 50, this.height / 6 + 96, 100, 20, this.copyLinkButtonText, (button) => {
        this.copyLinkToClipboard();
        this.callbackFunction(false);
    }));
    this.addButton(new Button(this.width / 2 - 50 + 105, this.height / 6 + 96, 100, 20, this.cancelButtonText, (button) => {
        this.callbackFunction(false);
    }));
  }

  public copyLinkToClipboard(): void {
    this.minecraft.keyboardListener.setClipboardString(this.linkText);
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    super.render(context, mouseX, mouseY, partialTicks);
    if(this.showSecurityWarning) {
      this.drawCenteredString(context, this.font, this.openLinkWarning, this.width / 2, 110, 16764108);
    }
  }
}
