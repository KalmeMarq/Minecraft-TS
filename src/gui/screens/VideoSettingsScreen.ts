import AbstractOption from "../../GameOption.js";
import GameSettings from "../../GameSettings";
import { getKeyTranslation } from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import OptionButton from "../widgets/button/OptionButton.js";
import Screen from "./Screen.js";
import SettingsScreen from "./SettingsScreen.js";

export default class VideoSettingsScreen extends SettingsScreen {
  private SCREEN_OPTIONS: AbstractOption[] = [AbstractOption.AdvancedItemTooltipsOption, AbstractOption.AutoJumpOption, AbstractOption.ForceUnicodeFont, AbstractOption.HeldItemTooltipsOption, AbstractOption.HideGUIOption, AbstractOption.RawMouseInputOption, AbstractOption.ShowFPSOption, AbstractOption.SkipMultiplayerWarningOption, AbstractOption.VsyncOption, AbstractOption.CLOUDS_OPTION, AbstractOption.GRAPHICS_FANCINESS];
  
  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, getKeyTranslation("options.videoTitle"))
  }

  protected init(): void {
    let index = 0;
    for (const iterator of this.SCREEN_OPTIONS) {
      let x = this.width / 2 - 155 + (index % 2) * 160;
      let y = this.height / 6 - 12 + (index >> 1) * 24;
      this.addButton((iterator as any).createWidget(this.minecraft.gameSettings, x, y, 150));
      index++;
    }

    this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, getKeyTranslation("gui.done"), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    super.render(context, mouseX, mouseY);
    this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
  }
}