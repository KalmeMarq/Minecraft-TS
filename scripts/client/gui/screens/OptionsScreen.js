import Screen from './Screen.js';
import Button from '../widgets/button.js';
import VideoSettingsScreen from './VideoSettingsScreen.js';
import AccessibilityScreen from './AccessibilityScreen.js';
import TranslationText from '../../../util/text/TranslationText.js';
import GameSettings from '../../GameSettings.js';

class OptionsScreen extends Screen {
  constructor(parentScreen, gameSettingsObj) {
    super();
    this.lastScreen = parentScreen;
    this.settings = gameSettingsObj;

    this.resourcePackBtn;
  }

  initCont() {
    console.log(this.lastScreen);

    this.addButton(new Button(this.width / 2 - 155 * 2.5, this.height / 6 + (48 - 6) * 2.5, 150, 20, TranslationText("options.skinCustomisation"), () => {
      this.minecraft.displayGuiScreen(new CustomizeSkinScreen(this, this.settings));

    }));
    this.addButton(new Button(this.width / 2 + 5 * 2.5, this.height / 6 + (48 - 6) * 2.5, 150, 20, TranslationText("options.sounds"), () => {
        this.minecraft.displayGuiScreen(new OptionsSoundsScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 - 155 * 2.5, this.height / 6 + (72 - 6) * 2.5, 150, 20, TranslationText("options.video"), () => {
        this.minecraft.displayGuiScreen(new VideoSettingsScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 + 5 * 2.5, this.height / 6 + (72 - 6) * 2.5, 150, 20, TranslationText("options.controls"), () => {
        this.minecraft.displayGuiScreen(new ControlsScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 - 155 * 2.5, this.height / 6 + (96 - 6) * 2.5, 150, 20, TranslationText("options.language"), () => {
        // this.minecraft.displayGuiScreen(new LanguageScreen(this, this.settings, this.minecraft.getLanguageManager()));
      if(GameSettings.language === 'en_us') {
        this.settings.language = 'pt_pt';
      } else {
        this.settings.language = 'en_us';
      }

      this.minecraft.displayGuiScreen(new OptionsScreen(this.lastScreen));
    }));
    this.addButton(new Button(this.width / 2 + 5 * 2.5, this.height / 6 + (96 - 6) * 2.5, 150, 20, TranslationText("options.chat.title"), () => {
        this.minecraft.displayGuiScreen(new ChatOptionsScreen(this, this.settings));
    }));
    this.resourcePackBtn = this.addButton(new Button(this.width / 2 - 155 * 2.5, this.height / 6 + (120 - 6) * 2.5, 150, 20, TranslationText("options.resourcepack"), () => {
      console.log('No action');
    }));
    this.addButton(new Button(this.width / 2 + 5 * 2.5, this.height / 6 + (120 - 6) * 2.5, 150, 20, TranslationText("options.accessibility.title"), () => {
        this.minecraft.displayGuiScreen(new AccessibilityScreen(this, this.settings));
    }));
    this.addButton(new Button(this.width / 2 - 100 * 2.5, this.height / 6 + 168 * 2.5, 200, 20, TranslationText("gui.done"), () => {
        this.minecraft.displayGuiScreen(this.lastScreen);
    }));

    this.resourcePackBtn.active(false);
  }

  closeScreen() {
    this.minecraft.displayGuiScreen(this.lastScreen);
  }
}

export default OptionsScreen;