import { Minecraft, optionsBackgroundImg } from '../../../index.js';
import AbstractGui from '../AbstractGui.js';
import Button from '../widgets/Button.js'

export default class ScreenP extends AbstractGui {
  public title
  public minecraft
  public width
  public height
  public buttons: Array<Button> = new Array();

  constructor() {
    super();

    this.title = '';
    this.minecraft = Minecraft;
    this.width = 0;
    this.height = 0;
    this.buttons = [];

    window.addEventListener('keydown', e => {
      if(e.key === 'Escape' && this.shouldCloseOnEsc()) {
        this.closeScreen();
      }
    })
  }

  renderWidgets() {
    document.getElementById('root')!.innerHTML = '';

    for(var i = 0; i < this.buttons.length; i++) {
      let button: Button = this.buttons[i];
      button.render()
    }
  }

  addButton(button: Button) {
    this.buttons.push(button);
    return button;
  }

  initScreen(width: number, height: number) {
    this.buttons = [];
    this.width = width;
    this.height = height;
    this.init();
    this.renderWidgets();
    this.render();
  }

  shouldCloseOnEsc() {
    return true;
  }

  closeScreen() {
    this.minecraft.displayGuiScreen(null);
  }

  protected init(): void {
  }

  public render(): void {
  }

  renderDirtBackground() {

    const canvas = document.createElement('canvas')!;
    canvas.style.transform = 'scale(' + 1.5 * (2.55 + 0.5) + ')';
    canvas.width = this.width;
    canvas.height = this.height;



    canvas.className = 'canvas-bg';


    const ctx = canvas!.getContext('2d')!;
  
    let img = optionsBackgroundImg;
    
    var ptrn = ctx.createPattern(img, 'repeat')!; 
    ctx.fillStyle = ptrn;
    ctx.filter = 'brightness(35%)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.style.zIndex = '-5'
    
    // const dirt = document.createElement('div');
    // dirt.style.position = 'absolute';
    // dirt.style.top = '0px';
    // dirt.style.left = '0px';
    // dirt.style.background = 'rgb(61, 35, 13)';
    // dirt.style.width = this.width + 'px';
    // dirt.style.height = this.height + 'px';
    // dirt.style.zIndex = '-15';
    document.getElementById('root')!.appendChild(canvas);
  }
}