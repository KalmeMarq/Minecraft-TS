import GameSettings from '@mcsrc/GameSettings';
import Util from '@mcsrc/util/Util';
import Button from '../widgets/button/Button';
import SettingsScreen from './SettingsScreen';

export default class MouseSettingsScreen extends SettingsScreen {
  constructor(parentScreen: SettingsScreen, settings: GameSettings) {
    super(parentScreen, settings, Util.getTranslation('options.mouse_settings.title'));
  }

  protected init(): void {
    this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, Util.getTranslation('gui.done'), (button) => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderBackground(context);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 5, 16777215);
    super.render(context, mouseX, mouseY, partialTicks);
  }
}
