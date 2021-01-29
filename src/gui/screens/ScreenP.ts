import { optionsBackgroundImg } from "../../index.js";
import IGuiEventListener from "../../interfaces/IGuiEventListener.js";
import IRenderable from "../../interfaces/IRenderable.js";
import Minecraft from "../../Minecraft.js";
import AbstractGui from "../AbstractGui.js";
import FocusableGui from "../FocusableGui.js";
import OptionButton from "../widgets/button/OptionButton.js";
import Widget from "../widgets/Widget.js";

class ScreenP extends AbstractGui implements IRenderable, IGuiEventListener {
  protected minecraft: any = null;
  public width: number = 0;
  public height: number = 0;
  protected children: Array<Widget> = new Array();
  protected buttons: Array<Widget> = new Array();
  protected focusedWidget = -1;

  private listener: IGuiEventListener | null = null;

  public getListener(): IGuiEventListener | null {
    return this.listener;
  }

  public setListener(listener: IGuiEventListener | null): void {
    this.listener = listener;
  }

  public initScreen(minecraft: Minecraft, width: number, height: number) {
    this.minecraft = minecraft;
    this.buttons = [];
    this.children = [];
    this.width = width;
    this.height = height;
    // this.setListener(null);
    this.init();
    (this.focusedWidget !== -1 || this.focusedWidget !== null || this.focusedWidget !== undefined) && this.children[this.focusedWidget] ? this.children[this.focusedWidget].changeFocus(true) : null;
  }

  protected init(): void {
  }

  public renderObject(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.render(context, mouseX, mouseY);
    for(var i = 0; i < this.buttons.length; ++i) {
      this.buttons[i].renderObject(context, mouseX, mouseY);
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

      this.focusedWidget = -1 

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

  public onClose(): void {
  }

  keyDown(key: string, modifiers: any) {
    let a = true;
    for (let i = 0; i < this.getEventListeners().length; i++) {
      const j = this.getEventListeners()[i];
      
      j.keyDown(key, modifiers);

      if(j instanceof OptionButton) {
        a = false;
      }
    }

    if(key === 'F3') this.minecraft.gameSettings.showFPS = !this.minecraft.gameSettings.showFPS;
    
    if(key == 'Escape' && this.shouldCloseOnEsc()) {
      this.closeScreen();
      return true;
   } else if (key == 'Tab') {
      // let flag = !modifiers.shiftKeyDown;
      // if (!this.changeFocus(flag)) {
         this.changeFocus(true);
      // }
      return false;
   } else if(key == 'Enter' && this.focusedWidget !== -1) {
     if(a) this.focusedWidget = -1;
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
    if(this.minecraft !== null) {
      context.save();
      context.scale(this.minecraft.getScaleFactor() * 0.65, this.minecraft.getScaleFactor() * 0.65)
      context.fillStyle = context.createPattern(optionsBackgroundImg, 'repeat')!;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  
      context.fillStyle = 'rgba(0, 0, 0, 0.7)';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  
      context.restore()
    }
  }

  mouseDragged() {}
  mouseMoved() {}
  mouseScrolled() {
    console.log("scrolling");
  }

  public changeFocus(focus: boolean) {
    if(this.focusedWidget + 2 > this.children.length) {
      this.focusedWidget = -1;
    }

    this.focusedWidget++;
    
    // const a = this.children[2];

    // if(this.getListener() === a) {
    // this.setListener(this.children[3]);

    // }
    // // a.changeFocus(true)

    // // this.children[2].changeFocus(true)

    // this.setListener(a);


    return false;
   /*  let iguieventlistener: IGuiEventListener | null = this.getListener();
    let flag = iguieventlistener != null;

    if (flag && iguieventlistener!.changeFocus(focus)) {
      return true;
   } else {

    let list: IGuiEventListener[] = this.getEventListeners();
    let j = list.indexOf(iguieventlistener!);
    let i;
    if (flag && j >= 0) {
       i = j + (focus ? 1 : 0);
    } else if (focus) {
       i = 0;
    } else {
       i = list.length;
    } 

    let iguieventlistener1: IGuiEventListener = this.children[2];
    if (iguieventlistener1.changeFocus(focus)) {
      this.setListener(iguieventlistener1);
      return true;
   }

    this.setListener(null);
    return false;
  } */
  }
}

export default ScreenP;