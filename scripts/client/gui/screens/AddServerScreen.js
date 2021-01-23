import Screen from './Screen.js';
import Button from '../widgets/button.js';
import TranslationText from '../../../util/text/TranslationText.js';

export default class AddServerScreen extends Screen {
  constructor(parentScreen) {
    super();
    this.parentScreen = parentScreen;
  }

  init() {
    this.addButton(new Button(this.width / 2 - 100 * 2.55, this.height / 4 + (120 + 18) * 2.55, 200, 20, TranslationText('gui.cancel'), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
   }));
  }

  closeScreen() {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }
}