import { clickXM, clickYM, ctx, font, scaleFactor, widgetsImg, resetClickXY, clicked, resetClick } from '../../../../index.js';
import ColorHelper from '../../../../util/ColorHelper.js';
import FontRenderer from '../../FontRenderer.js';
import ScreenP from '../../screens/ScreenP.js';
import Widget from '../Widget.js';
import AbstractButton from './AbstractButton.js';

export default class Button extends AbstractButton {
  public x;
  public y;
  protected width;
  protected height;
  protected alpha = 1.0;
  private clickEv;
  public active;
  protected isHovered = false;
  protected focused = false;

  constructor(x: number, y: number, width: number, height: number, title: string, clickEv: Function) {
    super(x, y, width, height, title);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.message = title; 
    this.clickEv = clickEv;
    this.active = true;
  }

  protected getYImage(isHovered: boolean) {
    let i = 1;
    if (!this.active) i = 0;
    else if (isHovered) i = 2;
    return i;
 }

  public renderButton(mouseX: number, mouseY: number): void {
    let yUV = this.getYImage(this.isMouseOver(mouseX, mouseY));
    this.isHovered = this.isMouseOver(mouseX, mouseY);

    if(this.clicked(clickXM, clickYM)) {
      // resetClick();
      const a = new Audio('./dist/resources/assets/minecraft/sounds/click_stereo.ogg');
      a.volume = 0.2;
      a.play();
      this.clickEv();
    }

    this.renderBgG(widgetsImg, [0, 46 + 20 * yUV], [this.x, this.y], [this.width / 2, 20]);
    this.renderBgG(widgetsImg, [200 - this.width / 2, 46 + 20 * yUV], [this.x + this.width / 2, this.y], [this.width / 2, 20]);

    let textColor = this.active ? 16777215 : 10526880;
    FontRenderer.renderCenteredText(this.message, this.x + this.width / 2, this.y + (this.height - 8) / 2, textColor);

    // ScreenP.drawCenteredString(font, this.message, this.x + this.width / 2, this.y + (this.height - 8) / 2, textColor)
  }

  public renderBgG(img: any, uv: number[], offset: number[], uvSize: number[]) {
    ctx.clearRect(offset[0], offset[1], uvSize[0], uvSize[1]);
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(img, uv[0], uv[1], uvSize[0], uvSize[1], offset[0], offset[1], uvSize[0], uvSize[1]);
    ctx.restore();
  }

  protected clicked(clickX: number, clickY: number): boolean {
    return clicked && this.active && this.visible && clickX >= this.x * scaleFactor && clickY >= this.y * scaleFactor && clickX < (this.x + this.width) * scaleFactor && clickY < (this.y + this.height) * scaleFactor;
 }

  public isMouseOver(mouseX: number, mouseY: number): boolean {
    return this.active && this.visible && mouseX >= this.x * scaleFactor && mouseY >= this.y * scaleFactor && mouseX <= (this.x + this.width) * scaleFactor && mouseY <= (this.y + this.height) * scaleFactor;
  }

  public setActive(state: boolean) {
    this.active = state;
  }
}