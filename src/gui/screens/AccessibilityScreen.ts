import GameOption from "../../GameOption.js";
import GameSettings from "../../GameSettings.js";
import NewAbstractOption from "../../settings/AbstractOption.js";
import { getKeyTranslation } from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import Widget from "../widgets/Widget.js";
import Screen from "./Screen.js"; 
import SettingsScreen from "./SettingsScreen.js";

export default class AccessibilityScreen extends SettingsScreen {
  private SCREEN_OPTIONS: GameOption[] = [
    GameOption.NARRATOR,
    GameOption.SHOW_SUBTITLES,
    GameOption.ACCESSIBILITY_TEXT_BACKGROUND_OPACITY,
    GameOption.ACCESSIBILITY_TEXT_BACKGROUND,
    GameOption.CHAT_OPACITY,
    GameOption.LINE_SPACING,
    GameOption.DELAY_INSTANT,
    GameOption.AUTO_JUMP,
    GameOption.SNEAK,
    GameOption.SPRINT,
    GameOption.FOV_EFFECT_SCALE_SLIDER,
    GameOption.SCREEN_EFFECT_SCALE_SLIDER
  ];

  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, getKeyTranslation("options.accessibility.title"))
  }

  protected init(): void {
    let index = 0;
    for (const iterator of this.SCREEN_OPTIONS) {
      let x = this.width / 2 - 155 + (index % 2) * 160;
      let y = this.height / 6 - 12 + 24 * (index >> 1);
      this.addButton((iterator as NewAbstractOption).createWidget(this.minecraft.gameSettings, x, y, 150));
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