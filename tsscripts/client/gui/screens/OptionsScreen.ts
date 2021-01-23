import ScreenP from './ScreenP.js';

import Button from '../widgets/Button.js';
import VideoSettingsScreen from './VideoSettingsScreen.js';
import AccessibilityScreen from './AccessibilityScreen.js';
import ControlsScreen from './ControlsScreen.js';
import OptionsSoundsScreen from './OptionsSoundsScreen.js';
import CustomizeSkinScreen from './CustomizeSkinScreen.js';
import ChatOptionsScreen from './ChatOptionsScreen.js';
import LanguageScreen from './LanguageScreen.js';
import TranslationText from '../../../util/text/TranslationText.js';

class OptionsScreen extends ScreenP  {
  public lastScreen
  public settings
  public resourcePackBtn: Button | undefined

  constructor(parentScreen: ScreenP, gameSettingsObj: any) {
    super();
    this.lastScreen = parentScreen;
    this.settings = gameSettingsObj;

    this.resourcePackBtn;
  }

  init() {
   

    this.addButton(new Button(this.width / 2 - 155 * 2.55, this.height / 6 + (48 - 6) * 2.55, 150, 20, TranslationText("options.skinCustomisation"), () => {
        this.minecraft.displayGuiScreen(new CustomizeSkinScreen(this, this.settings));

    }));
    this.addButton(new Button(this.width / 2 + 5 * 2.55, this.height / 6 + (48 - 6) * 2.55, 150, 20, TranslationText("options.sounds"), () => {
        this.minecraft.displayGuiScreen(new OptionsSoundsScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 - 155 * 2.55, this.height / 6 + (72 - 6) * 2.55, 150, 20, TranslationText("options.video"), () => {
        this.minecraft.displayGuiScreen(new VideoSettingsScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 + 5 * 2.55, this.height / 6 + (72 - 6) * 2.55, 150, 20, TranslationText("options.controls"), () => {
        this.minecraft.displayGuiScreen(new ControlsScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 - 155 * 2.55, this.height / 6 + (96 - 6) * 2.55, 150, 20, TranslationText("options.language"), () => {
        this.minecraft.displayGuiScreen(new LanguageScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 + 5 * 2.55, this.height / 6 + (96 - 6) * 2.55, 150, 20, TranslationText("options.chat.title"), () => {
        this.minecraft.displayGuiScreen(new ChatOptionsScreen(this, this.settings));
    }));
    this.resourcePackBtn = this.addButton(new Button(this.width / 2 - 155 * 2.55, this.height / 6 + (120 - 6) * 2.55, 150, 20, TranslationText("options.resourcepack"), () => {
      return false;
    }));
    this.addButton(new Button(this.width / 2 + 5 * 2.55, this.height / 6 + (120 - 6) * 2.55, 150, 20, TranslationText("options.accessibility.title"), () => {
        this.minecraft.displayGuiScreen(new AccessibilityScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 - 100 * 2.55, this.height / 6 + 168 * 2.55, 200, 20, TranslationText("gui.done"), () => {
        this.minecraft.displayGuiScreen(this.lastScreen);
    }));

    this.resourcePackBtn.active(false);
  }

  closeScreen() {
    this.minecraft.displayGuiScreen(this.lastScreen);
  }

  render() {
    let title = TranslationText('options.title');
    ScreenP.drawCenteredString(this.root, title, this.width / 2, 15 * 2.55, 16777215);

    this.renderDirtBackground();
  }
}

export default OptionsScreen;