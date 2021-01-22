import Screen from './Screen.js';
import Button from '../widgets/button.js';
import TranslationText from '../../../util/text/TranslationText.js';
import AddServerScreen from './AddServerScreen.js';

class MultiplayerScreen extends Screen {
  constructor(parentScreen) {
    super();
    this.parentScreen = parentScreen;

    this.btnEditServer;
    this.btnSelectServer;
    this.btnDeleteServer;
  }

  initCont() {
    this.addButton(new Button(this.width / 2 + 4 * 2.5, this.height / 2 - 20 * 2.5, 150, 20, TranslationText("Simulate Select"), () => {
      this.func_214324_a(true)
    }));
    this.addButton(new Button(this.width / 2 - 200 * 2.5, this.height / 2 - 20 * 2.5, 150, 20, TranslationText("Simulate Deselect"), () => {
      this.func_214324_a(false)
    }));
    
    this.btnSelectServer = this.addButton(new Button(this.width / 2 - 154 * 2.5, this.height - 52 * 2.5, 100, 20, TranslationText("selectServer.select"), () => {
      console.log('No action');
    }));
    this.addButton(new Button(this.width / 2 - 50 * 2.5, this.height - 52 * 2.5, 100, 20, TranslationText("selectServer.direct"), () => {
      this.minecraft.displayGuiScreen(new ServerListScreen(this));
    }));
    this.addButton(new Button(this.width / 2 + (4 + 50) * 2.5, this.height - 52 * 2.5, 100, 20, TranslationText("selectServer.add"), () => {
      this.minecraft.displayGuiScreen(new AddServerScreen(this));
    }));
    this.btnEditServer = this.addButton(new Button(this.width / 2 - 154 * 2.5, this.height - 28 * 2.5, 70, 20, TranslationText("selectServer.edit"), () => {
      console.log('No action');
    }));
    this.btnDeleteServer = this.addButton(new Button(this.width / 2 - 74 * 2.5, this.height - 28 * 2.5, 70, 20, TranslationText("selectServer.delete"), () => {
      console.log('No action');
    }));
    this.addButton(new Button(this.width / 2 + 4 * 2.5, this.height - 28 * 2.5, 70, 20, TranslationText("selectServer.refresh"), () => {
      this.refreshServerList();
    }));
    this.addButton(new Button(this.width / 2 + (4 + 76) * 2.5, this.height - 28 * 2.5, 75, 20, TranslationText("gui.cancel"), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));

    this.func_214324_a(false);
  }

  closeScreen() {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }

  refreshServerList() {
    this.minecraft.displayGuiScreen(new MultiplayerScreen(this.parentScreen));
  }

  func_214324_a(activeBoolean) {
    this.btnEditServer.active(activeBoolean)
    this.btnSelectServer.active(activeBoolean)
    this.btnDeleteServer.active(activeBoolean)
  }
}

export default MultiplayerScreen;