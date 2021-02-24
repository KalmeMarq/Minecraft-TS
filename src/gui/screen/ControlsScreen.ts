import Util from '@km.mcts/util/Util';
import GameSettings from '../../GameSettings';
import Button from '../widgets/button/Button';
import GuiScreen from './GuiScreen';
import MouseSettingsScreen from './MouseSettingsScreen';
import SettingsScreen from './SettingsScreen';

export default class ControlsScreen extends SettingsScreen {
  private buttonReset!: Button;

  constructor(parentScreen: GuiScreen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, Util.getTranslation('controls.title'))
  }

  protected init(): void {
    this.addButton(new Button(this.width / 2 - 155, 18, 150, 20, Util.getTranslation('options.mouse_settings'), (button) => {
      this.minecraft.displayGuiScreen(new MouseSettingsScreen(this, this.gameSettings));
    }));

    this.buttonReset = this.addButton(new Button(this.width / 2 - 155, this.height - 29, 150, 20, Util.getTranslation('controls.resetAll'), (button) => {
    }));

    this.addButton(new Button(this.width / 2 + 5, this.height - 29, 150, 20, Util.getTranslation('gui.done'), (button) => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderBackground(context);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 8, 16777215);

    this.buttonReset.active = false;

    super.render(context, mouseX, mouseY, partialTicks);
  }
}