import { getKeyTranslation } from "../../utils/TranslationText.js";
import Button from "../widgets/button/Button.js";
import Screen from "./Screen.js";

export default class MultiplayerScreen extends Screen {
  public parentScreen;
  public btnEditServer!: Button
  public btnSelectServer!: Button
  public btnDeleteServer!: Button
  public selectedServer: any
  public flag: boolean;

  constructor(parentScreen: Screen) {
    super(getKeyTranslation('multiplayer.title'));
    this.parentScreen = parentScreen;
    this.flag = false;
  }

  protected init(): void {
    this.btnSelectServer = this.addButton(new Button(this.width / 2 - 154, this.height - 52, 100, 20, getKeyTranslation("selectServer.select"), () => {
    }));

    this.addButton(new Button(this.width / 2 - 50, this.height - 52, 100, 20, getKeyTranslation("selectServer.direct"), () => {
    }));

    this.addButton(new Button(this.width / 2 + (4 + 50), this.height - 52, 100, 20, getKeyTranslation("selectServer.add"), () => {
      this.flag = !this.flag;
    }));

    this.btnEditServer = this.addButton(new Button(this.width / 2 - 154, this.height - 28, 70, 20, getKeyTranslation("selectServer.edit"), () => {
    }));

    this.btnDeleteServer = this.addButton(new Button(this.width / 2 - 74, this.height - 28, 70, 20, getKeyTranslation("selectServer.delete"), () => {
    }));
    
    this.addButton(new Button(this.width / 2 + 4, this.height - 28, 70, 20, getKeyTranslation("selectServer.refresh"), () => {
      this.flag = false;
      this.refreshServerList();
    }));
    
    this.addButton(new Button(this.width / 2 + (4 + 76), this.height - 28, 75, 20, getKeyTranslation("gui.cancel"), () => {
      this.minecraft.displayGuiScreen(this.parentScreen);
    }));

    this.setActive();
  }

  refreshServerList() {
    this.minecraft.displayGuiScreen(new MultiplayerScreen(this.parentScreen));
  }

  private setActive() {
    this.btnEditServer.active = this.flag;
    this.btnSelectServer.active = this.flag;
    this.btnDeleteServer.active = this.flag;
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.renderDirtBackground(context)
    this.drawCenteredString(context, this.title, this.width / 2, 20, 16777215);
  }
}