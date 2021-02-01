import { getKeyTranslation } from "../../utils/TranslationText";
import Screen from "../screens/Screen";
import Button from "../widgets/button/Button";
import { CheckboxButton } from "../widgets/button/CheckboxButton";
import MultiplayerScreen from "./MultiplayerScreen";

export default class MultiplayerWarningScreen extends Screen {
   private prevScreen: Screen;
   private header = getKeyTranslation("multiplayerWarning.header");
   private message = getKeyTranslation("multiplayerWarning.message");
   private checkboxText = getKeyTranslation("multiplayerWarning.check");
   private cautionCheckbox!: CheckboxButton;

   constructor(prevScreen: Screen) {
    super();
    this.prevScreen = prevScreen;
   }

  protected init():void {
    this.addButton(new Button(this.width / 2 - 155, 100 + 180, 150, 20, getKeyTranslation('gui.proceed'), () => {
      if(this.cautionCheckbox.isChecked()) {
        this.minecraft.gameSettings.skipMultiplayerWarning = true;
        this.minecraft.gameSettings.saveOptions();
      }

      this.minecraft.displayGuiScreen(new MultiplayerScreen(this.prevScreen));
    }));

    this.addButton(new Button(this.width / 2 - 155 + 160, 100 + 180, 150, 20, getKeyTranslation('gui.back'), () => {
      this.minecraft.displayGuiScreen(this.prevScreen);
    }));
    
    this.cautionCheckbox = new CheckboxButton(this.width / 2 - 155 + 80, 76 + 180, 150, 20, this.checkboxText, this.cautionCheckbox);
    this.addButton(this.cautionCheckbox);
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.renderDirtBackground(context);
    this.drawString(context, this.header, 25, 30, 16777215);
    this.drawString(context, this.message, 25, 70, 16777215);
  }
}
