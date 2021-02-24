import GameOption from '@km.mcts/GameOption';
import GameSettings from '@km.mcts/GameSettings';
import Util from '@km.mcts/util/Util';
import Button from '../widgets/button/Button';
import OptionButton from '../widgets/button/OptionButton';
import GuiScreen from './GuiScreen';
import SettingsScreen from './SettingsScreen';

export default class LanguageScreen extends SettingsScreen {
  private warningInfo = `(${Util.getTranslation('options.languageWarning')})`;
  private forceUnicodeFontBtn!: OptionButton;
  private confirmSettingsBtn!: Button;

  constructor(parentScreen: GuiScreen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, Util.getTranslation('options.language'))
  }

  protected init(): void {
    this.forceUnicodeFontBtn = this.addButton(new OptionButton(this.width / 2 - 155, this.height - 38, 150, 20, GameOption.FORCE_UNICODE_FONT, GameOption.FORCE_UNICODE_FONT.getName(this.gameSettings), (button) => {
      GameOption.FORCE_UNICODE_FONT.nextValue(this.gameSettings);
      button.setMessage(GameOption.FORCE_UNICODE_FONT.getName(this.gameSettings));
      this.gameSettings.saveOptions();
    }));

    this.confirmSettingsBtn = this.addButton(new Button(this.width / 2 - 155 + 160, this.height - 38, 150, 20, Util.getTranslation('gui.done'), (button) => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));

    super.init();
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderBackground(context);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 20, 16777215);
    this.drawCenteredString(context, this.font, this.warningInfo, this.width / 2, this.height - 56, 8421504);
    super.render(context, mouseX, mouseY, partialTicks);
  }
}