import { optionsBackgroundImg } from "../../index.js";
import IGuiEventListener from "../../interfaces/IGuiEventListener.js";
import IRenderable from "../../interfaces/IRenderable.js";
import Minecraft from "../../Minecraft.js";
import FocusableGui from "../FocusableGui.js";
import Widget from "../widgets/Widget.js";

class ScreenP extends FocusableGui implements IRenderable, IGuiEventListener {
  protected minecraft: any;
  public width: number = 0;
  public height: number = 0;
  protected children: Array<Widget> = new Array();
  protected buttons: Array<Widget> = new Array();

  public initScreen(minecraft: Minecraft, width: number, height: number) {
    this.minecraft = minecraft;
    this.buttons = [];
    this.children = [];
    this.width = width;
    this.height = height;
    this.init();
  }

  protected init(): void {
  }

  public renderScreen(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.render(context, mouseX, mouseY);
    for(var i = 0; i < this.buttons.length; ++i) {
      this.buttons[i].renderScreen(context, mouseX, mouseY);
    }
  }

  protected addButton(button: Widget) {
    this.buttons.push(button);
    return this.addListener(button);
  }

  protected addListener(listener: Widget) {
    this.children.push(listener);
    return listener;
  }

  public getEventListeners() {
    return this.children;
  }

  protected render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
  }

  public mouseClicked(mouseX: number, mouseY: number, button: number) {
    for (let i = 0; i < this.getEventListeners().length; i++) {
      const j = this.getEventListeners()[i];
      
      j.mouseClicked(mouseX, mouseY, button);
    }
  }

  public mouseReleased(mouseX: number, mouseY: number, button: number) {
    for (let i = 0; i < this.getEventListeners().length; i++) {
      const j = this.getEventListeners()[i];
      
      j.mouseReleased(mouseX, mouseY, button);
    }
  }
  
  isMouseOver(mouseX: number, mouseY: number): void {
  }

  keyPressed(key: string, modifiers: any) {
    for (let i = 0; i < this.getEventListeners().length; i++) {
      const j = this.getEventListeners()[i];
      
      j.keyPressed(key, modifiers);
    }
  }

  keyReleased(key: string, modifiers: any) {
    for (let i = 0; i < this.getEventListeners().length; i++) {
      const j = this.getEventListeners()[i];
      
      j.keyReleased(key, modifiers);
    }
  }

  keyDown(key: string, modifiers: any) {
    if(key === 'F3') {
      const i = this.minecraft.isFpsVisible();
      this.minecraft.setFpsVisibility(i ? false : true)
    }
    
    if(key == 'Escape' && this.shouldCloseOnEsc()) {
      this.closeScreen();
      return true;
   } else if (key == 'Tab') {
      // let flag = !modifiers.shiftKeyDown;
      // if (!this.changeFocus(flag)) {
         this.changeFocus(true);
      // }
      return false;
   } else {
      // return super.keyPressed(keyCode, scanCode, modifiers);
    }
  }

  
  public shouldCloseOnEsc(): boolean {
    return true;
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(null);
  }

  public renderDirtBackground(context: CanvasRenderingContext2D) {
    context.save();
    context.scale(3 * 0.65, 3 * 0.65)
    context.fillStyle = context.createPattern(optionsBackgroundImg, 'repeat')!;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    context.restore()
  }

  mouseDragged() {}
  mouseMoved() {}
  mouseScrolled() {
    console.log("scrolling");
  }

  public changeFocus(focus: boolean) {
    let iguieventlistener: IGuiEventListener | null = this.getListener();
    // let flag = iguieventlistener != null;

    let list = this.getEventListeners();
    list[0].changeFocus(true);

    return false;
   /*  if (flag && iguieventlistener!.changeFocus(focus)) {
       return true;
    } else {
      const listener: any = iguieventlistener;

      let list = this.getEventListeners();
      let j = list.indexOf(listener);
      let i;
      if (flag && j >= 0) {
        i = j + (focus ? 1 : 0);
      } else if (focus) {
        i = 0;
      } else {
        i = list.length;
      }

      let k = 0;
       while(k < list.length) {
          let iguieventlistener1: IGuiEventListener = list[k];
          if (iguieventlistener1.changeFocus(true)) {
             this.setListener(iguieventlistener1);
             return true;
          }
       }

       this.setListener(null);
       return false;
    } */
  }
}

export default ScreenP;