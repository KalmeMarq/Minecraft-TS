import Util from '@mcsrc/util/Util';
import Button from '../widgets/button/Button';
import GuiScreen from './GuiScreen';

export default class PackScreen extends GuiScreen {
  private dropInfo: string = Util.getTranslation('pack.dropInfo');
  private prevScreen: GuiScreen;
  private doneButton!: Button;

  constructor(prevScreen: GuiScreen, title: string) {
    super(title);
    this.prevScreen = prevScreen;
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(this.prevScreen);
  }

  protected init(): void {
    this.doneButton = this.addButton(new Button(this.width / 2 + 4, this.height - 48, 150, 20, Util.getTranslation('gui.done'), (button) => {
      this.closeScreen();
   }));

    this.addButton(new Button(this.width / 2 - 154, this.height - 48, 150, 20, Util.getTranslation('pack.openFolder'), (button) => {
    }));
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    this.renderDirtBackground(context, 0);
    this.drawCenteredString(context, this.font, this.title, this.width / 2, 8, 16777215);
    this.drawCenteredString(context, this.font, this.dropInfo, this.width / 2, 20, 11184810);
    super.render(context, mouseX, mouseY, partialTicks);
  }
}