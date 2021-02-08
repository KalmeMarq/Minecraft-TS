import GameOption from '../../GameOption.js';
import GameSettings from '../../GameSettings.js';
import TranslationTextComponent, { getKeyTranslation } from '../../utils/TranslationText.js';
import Button from '../widgets/button/Button.js';
import MouseSettingsScreen from './MouseSettingsScreen.js';
import Screen from './Screen.js';
import SettingsScreen from './SettingsScreen.js';

export default class ControlsScreen extends SettingsScreen {
  private buttonReset!: Button;

  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, getKeyTranslation('controls.title'))
  }

  protected init(): void {
    this.addButton(new Button(this.width / 2 - 155, 18, 150, 20, getKeyTranslation('options.mouse_settings'), () => {
      this.minecraft.displayGuiScreen(new MouseSettingsScreen(this, this.gameSettings));
    }));

    this.addButton(GameOption.AUTO_JUMP.createWidget(this.gameSettings, this.width / 2 - 155 + 160, 18, 150));

    this.buttonReset = this.addButton(new Button(this.width / 2 - 155, this.height - 29, 150, 20, getKeyTranslation('controls.resetAll'), () => {
    }));

    this.addButton(new Button(this.width / 2 + 5, this.height - 29, 150, 20, getKeyTranslation('gui.done'), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    super.render(context, mouseX, mouseY);
    this.drawCenteredString(context, this.title, this.width / 2, 8, 16777215);

    let flag = false;
    this.buttonReset.active = flag;
  }
}