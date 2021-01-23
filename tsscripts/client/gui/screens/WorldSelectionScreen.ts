import ScreenP from './ScreenP.js';
import Button from '../widgets/Button.js';
import TextFieldWidget from '../widgets/TextFieldWidget.js';
import TranslationText from '../../../util/text/TranslationText.js';

export default class WorldSelectionScreen extends ScreenP {
  public prevScreen
  public deleteButton: Button | any
  public selectButton: Button | any
  public renameButton: Button | any
  public copyButton: Button | any
  public searchField: TextFieldWidget | any;

  constructor(screenIn: ScreenP) {
    super();
    this.prevScreen = screenIn;
    this.deleteButton;
    this.selectButton;
    this.renameButton;
    this.copyButton;
  }

  init() {

    this.addButton(new Button(this.width / 2 - 75 * 2.55, this.height / 2 - 20 * 2.55, 150, 20, TranslationText("Simulate Select"), () => {
      this.V(true)
    }));
    this.addButton(new Button(this.width / 2 - 75 * 2.55, this.height / 2 + 4 * 2.55, 150, 20, TranslationText("Simulate Deselect"), () => {
      this.V(false)
    }));

    this.selectButton = this.addButton(new Button(this.width / 2 - 154 * 2.55, this.height - 52 * 2.55, 150, 20, TranslationText("selectWorld.select"), () => {
      return false;
    }));
    this.addButton(new Button(this.width / 2 + 4 * 2.55, this.height - 52 * 2.55, 150, 20, TranslationText("selectWorld.create"), () => {
      return false;
    }));
    this.renameButton = this.addButton(new Button(this.width / 2 - 154 * 2.55, this.height - 28 * 2.55, 72, 20, TranslationText("selectWorld.edit"), () => {
      return false;
    }));
    this.deleteButton = this.addButton(new Button(this.width / 2 - 76 * 2.55, this.height - 28 * 2.55, 72, 20, TranslationText("selectWorld.delete"), () => {
      return false;
    }));

    this.copyButton = this.addButton(new Button(this.width / 2 + 4 * 2.55, this.height - 28 * 2.55, 72, 20, TranslationText("selectWorld.recreate"), () => {
      return false;
    }));
    this.addButton(new Button(this.width / 2 + 82 * 2.55, this.height - 28 * 2.55, 72, 20, TranslationText("gui.cancel"), () => {
      this.minecraft.displayGuiScreen(this.prevScreen);
    }));


    this.V(false)
  }

  closeScreen() {
    this.minecraft.displayGuiScreen(this.prevScreen);
  }

  V(activeBoolean: boolean) {
    this.selectButton.active(activeBoolean);
    this.renameButton.active(activeBoolean);
    this.deleteButton.active(activeBoolean);
    this.copyButton.active(activeBoolean);
  }

  render() {
    this.searchField = new TextFieldWidget(this.width / 2 - 100 * 2.55, 22 * 2.55, 200, 20, '').render();
    let title = TranslationText("selectWorld.title");
    ScreenP.drawCenteredString(this.root, title, this.width / 2, 16, 16777215);

    this.renderDirtBackground();
  }
}