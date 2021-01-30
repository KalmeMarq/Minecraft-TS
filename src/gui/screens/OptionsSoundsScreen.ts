import AbstractOption from "../../GameOption.js";
import GameSettings from "../../GameSettings";
import TranslationTextComponent from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import OptionButton from "../widgets/button/OptionButton.js";
import Screen from "./Screen.js";
import SettingsScreen from "./SettingsScreen.js";

export default class OptionsSoundsScreen extends SettingsScreen {
  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, new TranslationTextComponent("options.sounds.title").get())
  }

  protected init(): void {
    let i = 0;

    let j = this.width / 2 - 75;
    let k = this.height / 6 - 12;
    ++i;
    this.addButton(new OptionButton(j, k + 24 * (i >> 1), 150, 20, AbstractOption.ShowSubtitlesOption, AbstractOption.ShowSubtitlesOption.func_238152_c_(this.gameSettings), () => {
        AbstractOption.ShowSubtitlesOption.nextValue(this.minecraft.gameSettings);
        this.minecraft.gameSettings.saveOptions();
    }));

    this.addButton(new Button(this.width / 2 - 100, this.height / 6 + 168, 200, 20, new TranslationTextComponent("gui.done").get(), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  protected render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    super.render(context, mouseX, mouseY);
    this.renderDirtBackground(context);
    this.drawCenteredString(context, this.title, this.width / 2, 15, 16777215);
  }
}