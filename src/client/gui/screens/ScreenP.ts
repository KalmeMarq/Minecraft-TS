import { canvas, ctx, Minecraft, minecraftImg, mouseXM, mouseYM, optionsBackgroundImg, scaleFactor, widgetsImg } from '../../../index.js';
import AbstractGui from '../AbstractGui.js';
import Button from '../widgets/button/Button.js';

export default class ScreenP extends AbstractGui {
  public title: string = ''
  public minecraft;
  public width: number = 0;
  public height: number = 0;
  public buttons: Array<Button> = new Array();
  public req: any

  constructor() {
    super();
    this.minecraft = Minecraft;
    this.buttons = [];
  }

  public renderWidgets(): void {
    for(var i = 0; i < this.buttons.length; i++) {
      let button: Button = this.buttons[i];
      button.renderButton(mouseXM, mouseYM)
    }
  }

  addButton(button: Button): Button {
    let butston: Button = button;
    this.buttons.push(butston);
    return butston;
  }

  initScreen(width: number, height: number): void {
    this.buttons = [];
    this.width = width;
    this.height = height;
    this.init();
    this.render();
    this.renderWidgets();
  }

  protected init(): void {

  }

  protected render(): void {

  }

  public renderDirtBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var ptrn = ctx.createPattern(optionsBackgroundImg, 'repeat')!;
    ctx.save();
    ctx.scale(scaleFactor * 0.65, scaleFactor * 0.65)
    ctx.imageSmoothingEnabled = false
    ctx.fillStyle = ptrn;
    ctx.filter = 'brightness(30%)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.filter = 'brightness(100%)'
    ctx.restore()
  }
}