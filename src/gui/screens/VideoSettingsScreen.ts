import AbstractOption from "../../GameOption.js";
import GameSettings from "../../GameSettings";
import TranslationTextComponent from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import OptionButton from "../widgets/button/OptionButton.js";
import Screen from "./Screen.js";
import SettingsScreen from "./SettingsScreen.js";

export default class VideoSettingsScreen extends SettingsScreen {
  private SCREEN_OPTIONS: AbstractOption[] = [AbstractOption.AdvancedItemTooltipsOption, AbstractOption.AutoJumpOption, AbstractOption.ForceUnicodeFont, AbstractOption.HeldItemTooltipsOption, AbstractOption.HideGUIOption, AbstractOption.RawMouseInputOption, AbstractOption.ShowFPSOption, AbstractOption.SkipMultiplayerWarningOption, AbstractOption.VsyncOption];
  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj,  new TranslationTextComponent("options.videoTitle").get())
  }

  protected init(): void {
    let i = 0;
    for (const iterator of this.SCREEN_OPTIONS) {
      let j = this.width / 2 - 155 + (i % 2) * 160;
      let k = this.height / 6 - 12 + 24 * (i >> 1);
      this.addButton((iterator as any).createWidget(this.minecraft.gameSettings, j, k, 150));
      i++;
    }

    this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, new TranslationTextComponent("gui.done").get(), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  protected render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    super.render(context, mouseX, mouseY);
    this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
  }
}