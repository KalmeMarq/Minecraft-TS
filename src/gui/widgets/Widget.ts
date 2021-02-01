import { widgetsImg } from "../../utils/GetResources";
import IGuiEventListener from "../../interfaces/IGuiEventListener";
import IRenderable from "../../interfaces/IRenderable";
import { playSound } from "../../utils/PlaySound";
import AbstractGui from "../AbstractGui";

export default abstract class Widgets extends AbstractGui implements IRenderable, IGuiEventListener {
  protected width: number;
  protected height: number;
  public x: number;
  public y: number;
  private message: string;
  private wasHovered: boolean = false;
  protected isHovered: boolean = false;
  public active = true;
  public visible = true;
  protected alpha = 1.0;
  protected focused: boolean = false;

  constructor(x: number, y: number, width: number, height: number, title: string) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.message = title;
  }

  protected getYImage(isHovered: boolean) {
    let y = 1;
    if (!this.active) y = 0;
    else if (isHovered) y = 2;
    return y;
  }

  renderObject(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    if(this.visible) {
      this.isHovered = mouseX >= this.x && mouseY >= this.y && mouseX < this.x + this.width && mouseY < this.y + this.height;
      if(this.visible) this.renderButton(context, mouseX, mouseY);
      this.wasHovered = this.isHovered;
    }
  }

  public changeFocus(focus: boolean): boolean {
    if (this.active && this.visible) {
      this.focused = true;
      return this.focused;
    } else {
      return false;
    }
  }

  public renderButton(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    let yUV = this.getYImage(this.getHovered());
    context.save();
    context.globalAlpha = this.alpha;
    this.blit(context, widgetsImg, this.x, this.y, 0, 46 + yUV * 20, this.width / 2, this.height);
    this.blit(context, widgetsImg, this.x + this.width / 2, this.y, 200 - this.width / 2, 46 + yUV * 20, this.width / 2, this.height);
    let color = this.active ? 16777215 : 10526880;
    this.drawCenteredString(context, this.message, this.x + this.width / 2, this.y + (this.height - 8) / 2, color);
    context.restore();
  }

  public getHovered() {
    return this.isHovered || this.focused;
  }

  public onClick(mouseX: number, mouseY: number): void {
  }

  public onRelease(mouseX: number, mouseY: number): void {
  }

  public onDrag(mouseX: number, mouseY: number, dragX: number, dragY: number): void {
  }

  public mouseClicked(mouseX: number, mouseY: number, button: number) {
    if(this.active && this.visible) {
      if(this.isValidClickButton(button)) {
        let flag = this.clicked(mouseX, mouseY);
        if (flag) {
          this.focused = true
          playSound('resources/assets/minecraft/sounds/click_stereo.ogg', 0.2);
          this.onClick(mouseX, mouseY);
        }
      }
    }
  }

  public mouseReleased(mouseX: number, mouseY: number, button: number): boolean {
    if(this.isValidClickButton(button)) {
      this.onRelease(mouseX, mouseY);
      return true;
    } else return false;
  }

  protected clicked(mouseX: number, mouseY: number): boolean {
    return this.clicked && this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX < (this.x + this.width) && mouseY < (this.y + this.height);
  }

  public isMouseOver(mouseX: number, mouseY: number): boolean {
    return this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX <= (this.x + this.width) && mouseY <= (this.y + this.height);
  }

  public mouseMoved(xPos: number, mouseY: number): void {
  }

  public mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean {
    if(this.isValidClickButton(button)) {
      this.onDrag(mouseX, mouseY, dragX, dragY);
      return true;
   } else {
      return false;
   }
  }

  public mouseScrolled(mouseX: number, mouseY: number, delta: number): void {
  }

  public keyPressed(key: string, modifiers: {}): void {
  }

  public keyReleased(key: string, modifiers: {}): void {
  }

  public keyDown(key: string, modifiers: any) {
  }

  public charTyped() {}

  protected isValidClickButton(button: number): boolean {
    return button == 0;
  }

  public getWidth(): number {
    return this.width;
 }

  public setWidth(width: number): void {
    this.width = width;
  }

  public setAlpha(alpha: number): void {
    this.alpha = alpha;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getMessage(): string {
    return this.message;
  }

  public isFocused(): boolean {
    return this.focused;
  }

  protected setFocused(focused: boolean): void {
    this.focused = focused;
  }
}