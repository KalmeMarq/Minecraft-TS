import TranslationTextComponent from "../../utils/TranslationText.js";
import Screen from "../screens/Screen.js";
import Button from "../widgets/button/Button.js";
import { CheckboxButton } from "../widgets/button/CheckboxButton.js";
import MultiplayerScreen from "./MultiplayerScreen.js";

export default class MultiplayerWarningScreen extends Screen {
   private prevScreen: Screen;
   private field_230157_b_ = (new TranslationTextComponent("multiplayerWarning.header")).get();
   private field_230158_c_ = new TranslationTextComponent("multiplayerWarning.message").get();
   private field_230159_d_ = new TranslationTextComponent("multiplayerWarning.check").get();
   private field_230162_g_: CheckboxButton | any;
  //  private field_243364_s = IBidiRenderer.field_243257_a;

   constructor(prevScreen: Screen) {
    super();
    this.prevScreen = prevScreen;
   }

  protected init():void {
    // this.field_243364_s = IBidiRenderer.func_243258_a(this.font, field_230158_c_, this.width - 50);
    // let i = (this.field_243364_s.func_241862_a() + 1) * 9 * 2;
    let i = 10 * 9 * 2;
    this.addButton(new Button(this.width / 2 - 155, 100 + i, 150, 20, new TranslationTextComponent('gui.proceed').get(), () => {
      if(this.field_230162_g_.isChecked()) {
        this.minecraft.gameSettings.skipMultiplayerWarning = true;
        this.minecraft.gameSettings.saveOptions();
        console.log(this.minecraft.gameSettings.skipMultiplayerWarning);
      }

      console.log(this.minecraft.gameSettings.skipMultiplayerWarning);
      this.minecraft.displayGuiScreen(new MultiplayerScreen(this.prevScreen));
    }));

    this.addButton(new Button(this.width / 2 - 155 + 160, 100 + i, 150, 20, new TranslationTextComponent('gui.back').get(), () => {
      this.minecraft.displayGuiScreen(this.prevScreen);
    }));
    this.field_230162_g_ = new CheckboxButton(this.width / 2 - 155 + 80, 76 + i, 150, 20, this.field_230159_d_, this.field_230162_g_);
    this.addButton(this.field_230162_g_);
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.renderDirtBackground(context);
    this.drawString(context, this.field_230157_b_, 25, 30, 16777215);
    this.drawString(context, this.field_230158_c_, 25, 70, 16777215);
    super.render(context, mouseX, mouseY);
  }
}
