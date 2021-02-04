import AbstractOption from "../../GameOption.js";
import GameSettings from "../../GameSettings.js";
import { getKeyTranslation } from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import OptionButton from "../widgets/button/OptionButton.js";
import Screen from "./Screen.js";
import SettingsScreen from "./SettingsScreen.js";

export default class OptionsSoundsScreen extends SettingsScreen {
  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, getKeyTranslation("options.sounds.title"))
  }

  protected init(): void {
    let index = 1;
    const basePosX = this.width / 2 - 75;
    const basePosY = this.height / 6 - 12;

    this.addButton(new OptionButton(basePosX, basePosY + 24 * (index >> 1), 150, 20, AbstractOption.ShowSubtitlesOption, AbstractOption.ShowSubtitlesOption.func_238152_c_(this.gameSettings), () => {
      AbstractOption.ShowSubtitlesOption.nextValue(this.minecraft.gameSettings);
      this.minecraft.gameSettings.saveOptions();
    }));

    this.addButton(new Button(basePosX - 25, basePosY + 180, 200, 20, getKeyTranslation("gui.done"), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    super.render(context, mouseX, mouseY);
    this.drawCenteredString(context, this.title, this.width / 2, 15, 16777215);
  }
}