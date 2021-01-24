import Button from '../widgets/Button.js';
import SettingsScreen from './SettingsScreen.js';
import TranslationTextComponent from '../../../util/text/TranslationText.js';

export default class AccessibilitySettingsScreen extends SettingsScreen {
  protected init(): void {
    this.setTitle(new TranslationTextComponent("options.accessibility.title").get());

    this.addButton(new Button(this.width / 2 + 5, this.height - 27, 150, 20, new TranslationTextComponent("gui.done").get(), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
   }));
  }

  public render(): void {
    SettingsScreen.drawCenteredString(this.root, this.title, this.width / 2, 20, 16777215);
    this.renderDirtBackground();
  }
}