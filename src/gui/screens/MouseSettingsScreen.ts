import GameOption from '../../GameOption';
import GameSettings from '../../GameSettings';
import { int, float } from '../../utils/MouseHelper';
import TranslationTextComponent, { getKeyTranslation } from '../../utils/TranslationText';
import Button from '../widgets/button/Button';
import SettingsScreen from './SettingsScreen';

export default class MouseSettingsScreen extends SettingsScreen {
  private static OPTIONS: GameOption[] = [
    GameOption.SENSITIVITY,
    GameOption.INVERT_MOUSE,
    GameOption.MOUSE_WHEEL_SENSITIVITY,
    GameOption.DISCRETE_MOUSE_SCROLL,
    GameOption.TOUCHSCREEN
  ];

  constructor(parentScreen: SettingsScreen, settings: GameSettings) {
    super(parentScreen, settings, getKeyTranslation('options.mouse_settings.title'));
  }

  protected init(): void {
    let index = 0;
    for (const iterator of MouseSettingsScreen.OPTIONS) {
      let x = this.width / 2 - 155 + (index % 2) * 160;
      let y = this.height / 6 - 12 + (index >> 1) * 24;
      this.addButton((iterator as any).createWidget(this.minecraft.gameSettings, x, y, 150));
      index++;
    }

    this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, getKeyTranslation('gui.done'), () => {
      this.gameSettings.saveOptions();
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    super.render(context, mouseX, mouseY);
    this.renderDirtBackground(context);
    this.drawCenteredString(context, this.title, this.width / 2, 5, 16777215);
  }
}
