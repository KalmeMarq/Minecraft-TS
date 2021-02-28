import Util from '@mcsrc/util/Util';
import Button from '../widgets/button/Button';
import GuiScreen from './GuiScreen';

export default class MultiplayerScreen extends GuiScreen {
  public prevScreen: GuiScreen;
  public btnEditServer!: Button
  public btnSelectServer!: Button
  public btnDeleteServer!: Button
  public buttonsActive: boolean;
  
  constructor(prevScreen: GuiScreen) {
    super();
    this.prevScreen = prevScreen;
    this.buttonsActive = false;
  }

  protected init(): void {
    super.init();

    this.btnSelectServer = this.addButton(new Button(this.width / 2 - 154, this.height - 52, 100, 20, Util.getTranslation('selectServer.select'), (button) => {
    }));

    this.addButton(new Button(this.width / 2 - 50, this.height - 52, 100, 20, Util.getTranslation('selectServer.direct'), (button) => {
    }));

    this.addButton(new Button(this.width / 2 + (4 + 50), this.height - 52, 100, 20, Util.getTranslation('selectServer.add'), (button) => {
      this.buttonsActive = !this.buttonsActive;
      this.changeActive();
    }));

    this.btnEditServer = this.addButton(new Button(this.width / 2 - 154, this.height - 28, 70, 20, Util.getTranslation('selectServer.edit'), (button) => {
    }));

    this.btnDeleteServer = this.addButton(new Button(this.width / 2 - 74, this.height - 28, 70, 20, Util.getTranslation('selectServer.delete'), (button) => {
    }));
    
    this.addButton(new Button(this.width / 2 + 4, this.height - 28, 70, 20, Util.getTranslation('selectServer.refresh'), (button) => {
      this.buttonsActive = false;
      this.refreshServerList();
    }));
    
    this.addButton(new Button(this.width / 2 + (4 + 76), this.height - 28, 75, 20, Util.getTranslation('gui.cancel'), (button) => {
      this.minecraft.displayGuiScreen(this.prevScreen);
    }));

    this.changeActive();
  }

  private refreshServerList(): void {
    this.minecraft.displayGuiScreen(new MultiplayerScreen(this.prevScreen));
  }

  protected changeActive(): void {
    this.btnEditServer.active = false;
    this.btnSelectServer.active = false;
    this.btnDeleteServer.active = false;
    if(this.buttonsActive) {
      this.btnEditServer.active = true;
      this.btnSelectServer.active = true;
      this.btnDeleteServer.active = true;
    }
  }

  public keyPressed(key: string, modifiers: any): boolean {
    if(super.keyPressed(key, modifiers)) {
      return true;
    } else if (key === 'F5') {
      this.refreshServerList();
      return true;
    } else {
      return false;
    }
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderBackground(context);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 20, 16777215);
    super.render(context, mouseX, mouseY, partialTicks)
  }
}