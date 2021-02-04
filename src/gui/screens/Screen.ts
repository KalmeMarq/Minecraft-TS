import IGuiEventListener from "../../interfaces/IGuiEventListener.js";
import IRenderable from "../../interfaces/IRenderable.js";
import Minecraft from "../../Minecraft.js";
import AbstractGui from "../AbstractGui.js";
import OptionButton from "../widgets/button/OptionButton.js";
import Widget from "../widgets/Widget.js";
import { getResourceLocation } from "../../utils/Resources.js";

export default class Screen extends AbstractGui implements IRenderable, IGuiEventListener {
  protected OPTIONS_BACKGROUND = getResourceLocation('textures', 'gui/options_background')
  protected minecraft: any = null;
  public width: number = 0;
  public height: number = 0;
  protected children = new Array();
  protected buttons = new Array();
  protected focusedWidget = -1;
  protected title;
  private isDragging: boolean = false;

  constructor(...args: any[]) {
    super();

    if(args.length === 1) this.title = args[0]
  }

  public getDragging(): boolean {
    return this.isDragging;
 }

  public setDragging(dragging: boolean): void {
    this.isDragging = dragging;
  }

  public initScreen(minecraft: Minecraft, width: number, height: number) {
    this.minecraft = minecraft;
    this.buttons = [];
    this.children = [];
    this.width = width;
    this.height = height;
    this.init();
    this.focusedWidget > -1 && this.children[this.focusedWidget] ? this.children[this.focusedWidget].changeFocus(true) : null;
  }

  protected init(): void {
  }

  public renderObject(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
    this.render(context, mouseX, mouseY);
    for(var i = 0; i < this.buttons.length; ++i) {
      this.buttons[i].renderObject(context, mouseX, mouseY);
    }
  }

  protected addButton<T extends Widget>(button: T): T {
    this.buttons.push(button);
    return this.addListener(button);
  }

  protected addListener<T extends Widget>(listener: T): T {
    this.children.push(listener);
    return listener;
  }

  public getEventListeners(): Array<Widget> {
    return this.children;
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number): void {
  }

  public mouseClicked(mouseX: number, mouseY: number, button: number): void {
    for(const iguieventlistener of this.getEventListeners()) {
      iguieventlistener.mouseClicked(mouseX, mouseY, button);
    }
    this.setDragging(true);
  }

  public mouseReleased(mouseX: number, mouseY: number, button: number): void {
    this.setDragging(false);
    for(const iguieventlistener of this.getEventListeners()) {
      iguieventlistener.mouseReleased(mouseX, mouseY, button);
    }

    this.focusedWidget = -1;
  }

  public mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): void {
    // console.log(mouseX, mouseY, dragX, dragY);
    this.children[0].mouseDragged(mouseX, mouseY, button, dragX, dragY)
    
    // return this.focusedWidget != -1 && this.getDragging() && button == 0 ? this.children[this.focusedWidget].mouseDragged(mouseX, mouseY, button, dragX, dragY) : false;
  }
  
  public isMouseOver(mouseX: number, mouseY: number): boolean {
    return false;
  }

  public mouseScrolled(mouseX: number, mouseY: number, delta: number) {
    for(const iguieventlistener of this.getEventListeners()) {
      iguieventlistener.mouseScrolled(mouseX, mouseY, delta);
    }
  }

  public mouseMoved(): boolean {
    return false;
  }

  public keyPressed(key: string, modifiers: any): void {
    for(const iguieventlistener of this.getEventListeners()) {
      iguieventlistener.keyPressed(key, modifiers);
    }
  }

  public keyReleased(key: string, modifiers: any): void {
    for(const iguieventlistener of this.getEventListeners()) {
      iguieventlistener.keyReleased(key, modifiers);
    }
  }

  public tick(): void {
  }

  public keyDown(key: string, modifiers: any): void {
    let flag = true;
    for (let i = 0; i < this.getEventListeners().length; i++) {
      const iguieventlistener = this.getEventListeners()[i];
      iguieventlistener.keyDown(key, modifiers);
      if(iguieventlistener instanceof OptionButton) flag = false;
    }

    if(key === 'F3') this.minecraft.gameSettings.showFPS = !this.minecraft.gameSettings.showFPS;
    else if(key == 'Escape' && this.shouldCloseOnEsc()) this.closeScreen();
    else if (key == 'Tab') this.changeFocus(true);
    else if(key == 'Enter' && this.focusedWidget !== -1 && flag) this.focusedWidget = -1;
  }

  public charTyped(): boolean {
    return false;
  }

  public onClose(): void {
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
      context.fillStyle = context.createPattern(this.OPTIONS_BACKGROUND, 'repeat')!;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = 'rgba(0, 0, 0, 0.7)';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      context.restore()
    }
  }

  public changeFocus(focus: boolean): boolean {
    
    if(this.focusedWidget + 2 > this.children.length) this.focusedWidget = -1;
    while(true) {
      this.focusedWidget++;
      if(this.children[this.focusedWidget].active) {
        for(var i = 0; i < this.children.length; i++) this.children[i].focused = false;
        break;
      }
    }
    return false;
  }
}