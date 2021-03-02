import GameOption from '@mcsrc/GameOption';
import GameSettings from '@mcsrc/GameSettings';
import Language from '@mcsrc/resources/FWEFW';
import TranslationTextComponent from '@mcsrc/util/text/TranslationTextComponent';
import Util from '@mcsrc/util/Util';
import Button from '../widgets/button/Button';
import OptionButton from '../widgets/button/OptionButton';
import GuiScreen from './GuiScreen';
import SettingsScreen from './SettingsScreen';

export default class LanguageScreen extends SettingsScreen {
  private static warningInfo = new TranslationTextComponent('options.languageWarning');
  private forceUnicodeFontBtn!: OptionButton;
  private confirmSettingsBtn!: Button;

  constructor(parentScreen: GuiScreen, gameSettingsObj: GameSettings) {
    super(parentScreen, gameSettingsObj, Util.getTranslation('options.language'))
  }

  protected init(): void {
    const langs: Set<Language> = this.minecraft.getLanguageManager().getLanguages();

    let index = 0;
    for(let lang of langs.values()) {
      let x = this.width / 2 - 210 + (index % 12) * 35;
      let y = this.height / 6 - 12 + 20 * (index >> 4);
      this.addButton(new Button(x, y, 35, 20, lang.getCode(), () => {
        this.gameSettings.language = lang.getCode();
      }));
      index++;
    }
    
    this.forceUnicodeFontBtn = this.addButton(new OptionButton(this.width / 2 - 155, this.height - 38, 150, 20, GameOption.FORCE_UNICODE_FONT, GameOption.FORCE_UNICODE_FONT.getName(this.gameSettings), (button) => {
      GameOption.FORCE_UNICODE_FONT.nextValue(this.gameSettings);
      button.setMessage(GameOption.FORCE_UNICODE_FONT.getName(this.gameSettings));
      this.gameSettings.saveOptions();
    }));

    this.confirmSettingsBtn = this.addButton(new Button(this.width / 2 - 155 + 160, this.height - 38, 150, 20, Util.getTranslation('gui.done'), (button) => {
      this.minecraft.loadResources();
      this.gameSettings.saveOptions();
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));

    super.init();
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderBackground(context);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 20, 16777215);
    this.drawCenteredString(context, this.font, LanguageScreen.warningInfo, this.width / 2, this.height - 56, 8421504);
    super.render(context, mouseX, mouseY, partialTicks);
  }
}