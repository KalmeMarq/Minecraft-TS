import TranslationTextComponent from "../../utils/TranslationText";
import Button from "../widgets/button/Button";
import ScreenP from "./ScreenP";

export default class AccessibilityScreen extends ScreenP {
  public parentScreen;

  constructor(parentScreen: ScreenP) {
    super();
    this.parentScreen = parentScreen;
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }
  
  init() {
    this.addButton(new Button(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationTextComponent("gui.done").get(), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    this.renderDirtBackground(context);
  }
}