import ScreenP from './ScreenP.js';
import Button from '../widgets/Button.js';
import TranslationText from '../../../util/text/TranslationText.js';
import drawCenteredString from '../../../util/text/drawCenteredString.js';
import AddServerScreen from './AddServerScreen.js';

export default class MultiplayerScreen extends ScreenP {
  public parentScreen
  public btnEditServer: Button | any
  public btnSelectServer: Button | any
  public btnDeleteServer: Button | any

  constructor(parentScreen: ScreenP) {
    super();
    this.parentScreen = parentScreen;

    this.btnEditServer;
    this.btnSelectServer;
    this.btnDeleteServer;
  }

  init() {
    this.addButton(new Button(this.width / 2 - 75 * 2.55, this.height / 2 - 20 * 2.55, 150, 20, TranslationText("Simulate Select"), () => {
      this.V(true)
    }));
    this.addButton(new Button(this.width / 2 - 75 * 2.55, this.height / 2 + 4 * 2.55, 150, 20, TranslationText("Simulate Deselect"), () => {
      this.V(false)
    }));
    
    this.btnSelectServer = this.addButton(new Button(this.width / 2 - 154 * 2.55, this.height - 52 * 2.55, 100, 20, TranslationText("selectServer.select"), () => {
      return false;
    }));
    this.addButton(new Button(this.width / 2 - 50 * 2.55, this.height - 52 * 2.55, 100, 20, TranslationText("selectServer.direct"), () => {
      return false;
    }));
    this.addButton(new Button(this.width / 2 + (4 + 50) * 2.55, this.height - 52 * 2.55, 100, 20, TranslationText("selectServer.add"), () => {
      this.minecraft.displayGuiScreen(new AddServerScreen(this));
    }));
    this.btnEditServer = this.addButton(new Button(this.width / 2 - 154 * 2.55, this.height - 28 * 2.55, 70, 20, TranslationText("selectServer.edit"), () => {
      return false;
    }));
    this.btnDeleteServer = this.addButton(new Button(this.width / 2 - 74 * 2.55, this.height - 28 * 2.55, 70, 20, TranslationText("selectServer.delete"), () => {
      return false;
    }));
    this.addButton(new Button(this.width / 2 + 4 * 2.55, this.height - 28 * 2.55, 70, 20, TranslationText("selectServer.refresh"), () => {
      this.refreshServerList();
    }));
    this.addButton(new Button(this.width / 2 + (4 + 76) * 2.55, this.height - 28 * 2.55, 75, 20, TranslationText("gui.cancel"), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));

    this.V(false);
  }

  closeScreen() {
    this.minecraft.displayGuiScreen(this.parentScreen);
  }

  refreshServerList() {
    this.minecraft.displayGuiScreen(new MultiplayerScreen(this.parentScreen));
  }

  V(activeBoolean: boolean) {
    this.btnEditServer.active(activeBoolean)
    this.btnSelectServer.active(activeBoolean)
    this.btnDeleteServer.active(activeBoolean)
  }

  render() {
    let title = TranslationText("multiplayer.title");
    drawCenteredString(document.getElementById('root'), title, this.width / 2, 20, 'white');
    this.renderDirtBackground();
  }
}