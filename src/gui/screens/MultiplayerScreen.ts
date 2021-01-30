import TranslationTextComponent from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import Screen from "./Screen.js";

export default class MultiplayerScreen extends Screen {
  public parentScreen;
  public btnEditServer: Button | any
  public btnSelectServer: Button | any
  public btnDeleteServer: Button | any
  public selectedServer: any
  public flag: boolean;

  constructor(parentScreen: Screen) {
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
    this.btnEditServer.active = this.flag;
    this.btnSelectServer.active = this.flag;
    this.btnDeleteServer.active = this.flag;
  }

  protected render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.renderDirtBackground(context)
    this.drawCenteredString(context, new TranslationTextComponent("multiplayer.title").get(), this.width / 2, 20, 16777215);
  }
}