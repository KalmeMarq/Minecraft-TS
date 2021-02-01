import AbstractOption from "../../GameOption";
import GameSettings from "../../GameSettings";
import { getKeyTranslation } from "../../utils/TranslationText";
import Button from "../widgets/button/Button";
import Screen from "./Screen";
import SettingsScreen from "./SettingsScreen";

export default class AccessibilityScreen extends SettingsScreen {
  private SCREEN_OPTIONS: AbstractOption[] = [AbstractOption.NARRATOR_STATUS, AbstractOption.ShowSubtitlesOption, AbstractOption.AutoJumpOption, AbstractOption.SNEAK, AbstractOption.SPRINT];

  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, getKeyTranslation("options.accessibility.title"))
  }

  protected init(): void {
    let index = 0;
    for (const iterator of this.SCREEN_OPTIONS) {
      let x = this.width / 2 - 155 + (index % 2) * 160;
      let y = this.height / 6 - 12 + 24 * (index >> 1);
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