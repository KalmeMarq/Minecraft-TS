import GameOption from '@mcsrc/GameOption';
import GameSettings from '@mcsrc/GameSettings';
import AbstractOption from '@mcsrc/settings/AbstractOption';
import Util from '@mcsrc/util/Util';
import Button from '../widgets/button/Button';
import GuiScreen from './GuiScreen';
import SettingsScreen from './SettingsScreen';

export default class AccessibilityScreen extends SettingsScreen {
  private SCREEN_OPTIONS: AbstractOption[] = [
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
  
  constructor(parentScreen: GuiScreen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, Util.getTranslation('options.accessibility.title'))
  }

  protected init(): void {
    this.tempAddOptions(this.SCREEN_OPTIONS)

    this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, Util.getTranslation('gui.done'), (button) => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderBackground(context);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 20, 16777215);
    super.render(context, mouseX, mouseY, partialTicks);
  }
}