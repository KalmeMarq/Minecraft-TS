import TranslationTextComponent, { getKeyTranslation } from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import Widget from "../widgets/Widget.js";
import Screen from "./Screen.js";

export default class WorldSelectionScreen extends Screen {
  public parentScreen;

  constructor(parentScreen: Screen) {
    super(getKeyTranslation('selectWorld.create'));
    this.parentScreen = parentScreen;
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }

  protected init(): void {
    const posX0 = this.width / 2 - 155;
    const posX1 = this.width / 2 + 5;

    this.addButton(new Button(posX1, this.height - 28, 150, 20, getKeyTranslation('gui.cancel'), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
   }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.renderDirtBackground(context)
    this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
  }
}