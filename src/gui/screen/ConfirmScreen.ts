import DialogTexts from "../DialogTexts";
import Button from "../widgets/button/Button";
import Widget from "../widgets/Widget";
import GuiScreen from "./GuiScreen";

export class ConfirmScreen extends GuiScreen {
  private messageLine2: string;
  protected confirmButtonText: string;
  protected cancelButtonText: string;
  private ticksUntilEnable: number = 0;
  protected callbackFunction: Function;

  constructor(callback: (b: boolean) => void, title: string, msgLine2: string, confirmBtnText: string = DialogTexts.GUI_YES.getTranslatedKey(), cancelBtnText: string = DialogTexts.GUI_NO.getTranslatedKey()) {
    super(title);
    this.callbackFunction = callback;
    this.messageLine2 = msgLine2;
    this.confirmButtonText = confirmBtnText;
    this.cancelButtonText = cancelBtnText;
  }

  protected init(): void {
    super.init();
    this.addButton(new Button(this.width / 2 - 155, this.height / 6 + 96, 150, 20, this.confirmButtonText, (button) => {
        this.callbackFunction(true);
    }));
    this.addButton(new Button(this.width / 2 - 155 + 160, this.height / 6 + 96, 150, 20, this.cancelButtonText, (button) => {
        this.callbackFunction(false);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderBackground(context);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 70, 16777215);
    super.render(context, mouseX, mouseY, partialTicks);
  }

  public setButtonDelay(ticksUntilEnableIn: number): void {
    this.ticksUntilEnable = ticksUntilEnableIn;

    for(const widget of this.buttons) {
      widget.active = false;
    }
  }

  public tick(): void {
    super.tick();
    if(--this.ticksUntilEnable == 0) {
      for(const widget of this.buttons) {
        widget.active = true;
      }
    }
  }

  public shouldCloseOnEsc(): boolean {
    return false;
  }

  public keyPressed(key: string, modifiers: any) {
    if(key == 'Escape') {
        this.callbackFunction(false);
        return true;
    } else {
        return super.keyPressed(key, modifiers);
    }
  }
}
