import { optionsBackgroundImg } from "../../utils/GetResources.js";
import IGuiEventListener from "../../interfaces/IGuiEventListener.js";
import IRenderable from "../../interfaces/IRenderable.js";
import Minecraft from "../../Minecraft.js";
import AbstractGui from "../AbstractGui.js";
import FocusableGui from "../FocusableGui.js";
import OptionButton from "../widgets/button/OptionButton.js";
import Widget from "../widgets/Widget.js";
import Button from "../widgets/button/Button.js";

export default class Screen extends AbstractGui implements IRenderable, IGuiEventListener {
  protected minecraft: any = null;
  public width: number = 0;
  public height: number = 0;
  protected children: Array<Widget | Button> = new Array();
  protected buttons: Array<Widget | Button> = new Array();
  protected focusedWidget = -1;
  protected title;

  constructor(...args: any[]) {
    super();

    if(args.length === 1) this.title = args[0]
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

  protected addButton(button: Widget | Button): Widget | Button {
    this.buttons.push(button);
    return this.addListener(button);
  }

  protected addListener(listener: Widget | Button) {
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
  }

  public mouseReleased(mouseX: number, mouseY: number, button: number): void {
    for(const iguieventlistener of this.getEventListeners()) {
      iguieventlistener.mouseReleased(mouseX, mouseY, button);
    }

    this.focusedWidget = -1;
  }

  public mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean {
    return false;
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
      context.fillStyle = context.createPattern(optionsBackgroundImg, 'repeat')!;
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
        break;
      }
    }
    return false;
  }
}