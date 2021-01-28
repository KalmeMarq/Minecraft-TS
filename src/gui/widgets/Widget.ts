import { widgetsImg } from "../../index.js";
import IGuiEventListener from "../../interfaces/IGuiEventListener.js";
import IRenderable from "../../interfaces/IRenderable.js";
import AbstractGui from "../AbstractGui.js";
import FontRenderer from "../FontRenderer.js";

class Widgets extends AbstractGui implements IRenderable, IGuiEventListener {
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
  public focused: boolean = false;

  constructor(x: number, y: number, width: number, height: number, title: string) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.message = title;
  }

  protected getYImage(isHovered: boolean) {
    let i = 1;
    if (!this.active) i = 0;
    else if (isHovered) i = 2;
    return i;
  }

  renderScreen(context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    if(this.visible) {
      this.isHovered = mouseX >= this.x && mouseY >= this.y && mouseX < this.x + this.width && mouseY < this.y + this.height;

      if(this.visible) {
        this.renderButton(context, mouseX, mouseY);
      }

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
/*     setInterval(() => {
      this.focused = true
      
    }, 1000) */

    this.renderBgG(context, widgetsImg, [0, 46 + 20 * yUV], [this.x, this.y], [this.width / 2, 20]);
    this.renderBgG(context, widgetsImg, [200 - this.width / 2, 46 + 20 * yUV], [this.x + this.width / 2, this.y], [this.width / 2, 20]);

    let textColor = this.active ? 16777215 : 10526880;
    FontRenderer.renderCenteredText(this.message, this.x + this.width / 2, this.y + (this.height - 8) / 2, textColor);
  }

  public renderBgG(context: CanvasRenderingContext2D, img: any, uv: number[], offset: number[], uvSize: number[]) {
    context.clearRect(offset[0], offset[1], uvSize[0], uvSize[1]);
    context.save();
    context.imageSmoothingEnabled = false;
    context.globalAlpha = this.alpha;
    context.drawImage(img, uv[0], uv[1], uvSize[0], uvSize[1], offset[0], offset[1], uvSize[0], uvSize[1]);
    context.restore();
  }

  public getHovered() {
    return this.isHovered || this.focused;
 }

  mouseClicked(mouseX: number, mouseY: number, button: number) {
    if(mouseX > this.x && mouseY > this.y && mouseX < this.x + this.width && mouseY < this.y + this.height) {
      console.log('button clicked');
    }
  }

  mouseReleased(mouseX: number, mouseY: number, button: number) {
    if(mouseX > this.x && mouseY > this.y && mouseX < this.x + this.width && mouseY < this.y + this.height) {
      console.log('button released');
    }
  }

  protected clicked(clickX: number, clickY: number): boolean {
    return this.clicked && this.active && this.visible && clickX >= this.x && clickY >= this.y && clickX < (this.x + this.width) && clickY < (this.y + this.height);
 }

  public isMouseOver(mouseX: number, mouseY: number): boolean {
    return this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX <= (this.x + this.width) && mouseY <= (this.y + this.height);
  }

  mouseMoved(xPos: number, mouseY: number): void {
  }

  mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): void {

  }
  mouseScrolled(mouseX: number, mouseY: number, delta: number): void {

  }
  keyPressed(key: string, modifiers: {}): void {

  }
  keyReleased(key: string, modifiers: {}): void {

  }

}

export default Widgets;