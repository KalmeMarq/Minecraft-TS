import Button from '../widgets/Button.js';
import SettingsScreen from './SettingsScreen.js';
import TranslationTextComponent from '../../../util/text/TranslationText.js';

export default class VideoSettingsScreen extends SettingsScreen {
  init() {
    this.setTitle(new TranslationTextComponent("options.videoTitle").get());

    this.addButton(new Button(this.width / 2 - 100, this.height - 27, 200, 20, new TranslationTextComponent("gui.done").get(), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
   }));
  }

  render() {
    this.renderDirtBackground();
    SettingsScreen.drawCenteredString(this.root, this.title, this.width / 2, 5, 16777215);
  }
}