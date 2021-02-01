import GameSettings from "../../GameSettings";
import { getKeyTranslation } from "../../utils/TranslationText";
import Button from "../widgets/button/Button";
import Screen from "./Screen";
import SettingsScreen from "./SettingsScreen";

export default class CustomizeSkinScreen extends SettingsScreen {
  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, getKeyTranslation("options.skinCustomisation.title"))
  }

  protected init(): void {
    this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, getKeyTranslation("gui.done"), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    super.render(context, mouseX, mouseY);
    this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
  }
}