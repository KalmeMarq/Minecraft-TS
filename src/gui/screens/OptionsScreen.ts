import AbstractOption from '../../GameOption.js';
import GameSettings from '../../GameSettings.js';
import { getKeyTranslation } from '../../utils/TranslationText.js';
import Button from '../widgets/button/Button.js';
import AccessibilityScreen from './AccessibilityScreen.js';
import ChatOptionsScreen from './ChatOptionsScreen.js';
import ControlsScreen from './ControlsScreen.js';
import CustomizeSkinScreen from './CustomizeSkinScreen.js';
import LanguageScreen from './LanguageScreen.js';
import OptionsSoundsScreen from './OptionsSoundsScreen.js';
import Screen from './Screen.js';
import VideoSettingsScreen from './VideoSettingsScreen.js';

export default class OptionsScreen extends Screen {
  private SCREEN_OPTIONS: AbstractOption[] = [AbstractOption.TestOption, AbstractOption.ShowFPSOption];
  public parentScreen;
  private settings: GameSettings;

  constructor(parentScreen: Screen, gameSettingsObj: GameSettings) {
    super(getKeyTranslation('options.title'));
    this.parentScreen = parentScreen;
    this.settings = gameSettingsObj;
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }
  
  protected init(): void {
    let index = 0;
    
    for(const iterator of this.SCREEN_OPTIONS) {
      let x = this.width / 2 - 155 + (index % 2) * 160;
      let y = this.height / 6 - 12 + 24 * (index >> 1);
      this.addButton((iterator as any).createWidget(this.minecraft.gameSettings, x, y, 150));
      index++;
    }

    const baseY = this.height / 6 - 6;
    const baseX0 = this.width / 2 - 155;
    const baseX1 = baseX0 + 160;

    this.addButton(new Button(baseX0, baseY + 48, 150, 20, getKeyTranslation('options.skinCustomisation'), () => {
      this.minecraft.displayGuiScreen(new CustomizeSkinScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX1, baseY + 48, 150, 20, getKeyTranslation('options.sounds'), () => {
      this.minecraft.displayGuiScreen(new OptionsSoundsScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX0, baseY + 72, 150, 20, getKeyTranslation('options.video'), () => {
      this.minecraft.displayGuiScreen(new VideoSettingsScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX1, baseY + 72, 150, 20, getKeyTranslation('options.controls'), () => {
      this.minecraft.displayGuiScreen(new ControlsScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX0, baseY + 96, 150, 20, getKeyTranslation('options.language'), () => {
      this.minecraft.displayGuiScreen(new LanguageScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX1, baseY + 96, 150, 20, getKeyTranslation('options.chat.title'), () => {
      this.minecraft.displayGuiScreen(new ChatOptionsScreen(this, this.settings));
    }));

    this.addButton(new Button(baseX0, baseY + 120, 150, 20, getKeyTranslation('options.resourcepack'), () => {}));

    this.addButton(new Button(baseX1, baseY + 120, 150, 20, getKeyTranslation('options.accessibility.title'), () => {
      this.minecraft.displayGuiScreen(new AccessibilityScreen(this, this.settings));
    }));

    this.addButton(new Button(this.width / 2 - 100, baseY + 174, 200, 20, getKeyTranslation('gui.done'), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));
  }

  render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    this.renderDirtBackground(context);
    this.drawCenteredString(context, this.title, this.width / 2, 15, 16777215);
  }
}