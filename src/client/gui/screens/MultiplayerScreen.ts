import TranslationTextComponent from "../../../util/TranslationText.js";
import Button from "../widgets/button/Button.js";
import ScreenP from "./ScreenP.js";

export default class MultiplayerScreen extends ScreenP {
  public parentScreen;
  public btnEditServer: Button | any
  public btnSelectServer: Button | any
  public btnDeleteServer: Button | any
  public selectedServer: any
  public flag;

  constructor(parentScreen: ScreenP) {
    super();
    this.parentScreen = parentScreen;
    this.flag = false;
  }

  init() {
    this.btnSelectServer = this.addButton(new Button(this.width / 2 - 154, this.height - 52, 100, 20, new TranslationTextComponent("selectServer.select").get(), () => {
    }));

    this.addButton(new Button(this.width / 2 - 50, this.height - 52, 100, 20, new TranslationTextComponent("selectServer.direct").get(), () => {
    }));

    this.addButton(new Button(this.width / 2 + (4 + 50), this.height - 52, 100, 20, new TranslationTextComponent("selectServer.add").get(), () => {
      this.flag = this.flag === true ? false : true;
      this.V()
    }));

    this.btnEditServer = this.addButton(new Button(this.width / 2 - 154, this.height - 28, 70, 20, new TranslationTextComponent("selectServer.edit").get(), () => {
    }));

    this.btnDeleteServer = this.addButton(new Button(this.width / 2 - 74, this.height - 28, 70, 20, new TranslationTextComponent("selectServer.delete").get(), () => {
    }));
    
    this.addButton(new Button(this.width / 2 + 4, this.height - 28, 70, 20, new TranslationTextComponent("selectServer.refresh").get(), () => {
      this.flag = false;
      this.refreshServerList();
    }));
    
    this.addButton(new Button(this.width / 2 + (4 + 76), this.height - 28, 75, 20, new TranslationTextComponent("gui.cancel").get(), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));

    this.V();
    
  }

  refreshServerList() {
    this.minecraft.displayGuiScreen(this);
  }

  V() {
    this.btnEditServer.setActive(this.flag)
    this.btnSelectServer.setActive(this.flag)
    this.btnDeleteServer.setActive(this.flag)
  }

  render() {
    this.renderDirtBackground();
  }
}