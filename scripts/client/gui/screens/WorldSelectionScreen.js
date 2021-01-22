import Screen from './Screen.js';
import Button from '../widgets/button.js';
import TranslationText from '../../../util/text/TranslationText.js';

class WorldSelectionScreen extends Screen {
  constructor(screenIn) {
    super();
    this.prevScreen = screenIn;
  }

  initCont() {
    let deleteButton;
    let selectButton;
    let renameButton;
    let copyButton;

    this.addButton(new Button(this.width / 2 + 4 * 2.5, this.height / 2 - 20 * 2.5, 150, 20, TranslationText("Simulate Select"), () => {
      this.func_214324_a(true)
    }));
    this.addButton(new Button(this.width / 2 - 200 * 2.5, this.height / 2 - 20 * 2.5, 150, 20, TranslationText("Simulate Deselect"), () => {
      this.func_214324_a(false)
    }));

    this.selectButton = this.addButton(new Button(this.width / 2 - 154 * 2.5, this.height - 52 * 2.5, 150, 20, TranslationText("selectWorld.select"), () => {
      console.log('No action');
    }));
    this.addButton(new Button(this.width / 2 + 4 * 2.5, this.height - 52 * 2.5, 150, 20, TranslationText("selectWorld.create"), () => {
      console.log('No action');
    }));
    this.renameButton = this.addButton(new Button(this.width / 2 - 154 * 2.5, this.height - 28 * 2.5, 72, 20, TranslationText("selectWorld.edit"), () => {
      console.log('No action');
    }));
    this.deleteButton = this.addButton(new Button(this.width / 2 - 76 * 2.5, this.height - 28 * 2.5, 72, 20, TranslationText("selectWorld.delete"), () => {
      console.log('No action');
    }));

    this.copyButton = this.addButton(new Button(this.width / 2 + 4 * 2.5, this.height - 28 * 2.5, 72, 20, TranslationText("selectWorld.recreate"), () => {
      console.log('No action');
    }));
    this.addButton(new Button(this.width / 2 + 82 * 2.5, this.height - 28 * 2.5, 72, 20, TranslationText("gui.cancel"), () => {
      this.minecraft.displayGuiScreen(this.prevScreen);
    }));

    this.func_214324_a(false)
  }

  closeScreen() {
    this.minecraft.displayGuiScreen(this.prevScreen);
  }

  func_214324_a(activeBoolean) {
    this.selectButton.active(activeBoolean);
    this.renameButton.active(activeBoolean);
    this.deleteButton.active(activeBoolean);
    this.copyButton.active(activeBoolean);
  }
}

export default WorldSelectionScreen;