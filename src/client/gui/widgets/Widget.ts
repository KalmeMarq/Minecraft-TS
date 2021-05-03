import IGuiEventListener from '../../../util/interfaces/IGuiEventListener'
import IRenderable from '../../../util/interfaces/IRenderable'
import Minecraft from '../../Minecraft'
import CanvasUtil from '../../../util/CanvasUtil'
import { TextComponent } from '../../../util/text/TextComponent'
import Util from '../../../util/Util'

export default class Widget implements IGuiEventListener, IRenderable {
  protected width: number
  protected height: number
  public x: number
  public y: number
  private wasHovered = false
  protected hovered = false
  public active = true
  public visible = true
  protected alpha = 1
  private focused = false
  private message: TextComponent

  public constructor (x: number, y: number, width: number, height: number, title: TextComponent) {
    this.x = Util.int(x)
    this.y = Util.int(y)
    this.width = Util.int(width)
    this.height = Util.int(height)
    this.message = title
  }

  public render (mouseX: number, mouseY: number, partialTicks: number): void {
    if (this.visible) {
      this.hovered = mouseX >= this.x && mouseY >= this.y && mouseX < this.x + this.width && mouseY < this.y + this.height
      this.renderButton(mouseX, mouseY)
      this.wasHovered = this.isHovered()
    }
  }

  protected getYImage (hovered: boolean): number {
    let i = 1
    if (!this.active) i = 0
    else if (hovered) i = 2
    return i
  }

  public renderButton (mouseX: number, mouseY: number): void {
    const mc = Minecraft.getInstance()
    // let font = mc.font;
    // mc.getTextureManager().useTex(Button.WIDGETS_LOCATION)
    const i = this.getYImage(this.isHovered())
    CanvasUtil.fillRect(this.x, this.y, this.x + this.width, this.y + this.height, (i === 1 ? 100 : 0))
    // ContextUtils.drawImageUV(0, 46 + i * 20, this.width / 2, 20, this.x, this.y, this.width / 2, this.height)
    // ContextUtils.drawImageUV(200 - this.width / 2, 46 + i * 20, this.width / 2, 20, this.x + this.width / 2, this.y, this.width / 2, this.height)
    this.renderBg(mc, mouseX, mouseY)
    // const j = this.active ? 16777215 : 10526880
    CanvasUtil.fillText(this.getMessage().key, this.x, this.y, 255, 255, 255)
    // AbstractGui.drawCenteredString(font, this.message, this.x, this.y, j | Math.ceil(this.alpha * 255) << 24);
  }

  public renderBg (mcIn: Minecraft, mouseX: number, mouseY: number): void {
  }

  public onClick (mouseX: number, mouseY: number): void {
  }

  public onRelease (mouseX: number, mouseY: number): void {
  }

  protected onDrag (mouseX: number, mouseY: number, dragX: number, dragY: number): void {
  }

  protected onFocusedChanged (focus: boolean): void {
  }

  public mouseMoved (mouseX: number, mouseY: number): void {
  }

  public mouseClicked (mouseX: number, mouseY: number, button: number): boolean {
    if (this.active && this.visible) {
      if (this.isValidClickButton(button)) {
        const flag = this.clicked(mouseX, mouseY)
        if (flag) {
          this.onClick(mouseX, mouseY)
          return true
        }
      }
      return false
    } else {
      return false
    }
  }

  public mouseReleased (mouseX: number, mouseY: number, button: number): boolean {
    if (this.isValidClickButton(button)) {
      this.onRelease(mouseX, mouseY)
      return true
    } else {
      return false
    }
  }

  public mouseDragged (mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean {
    if (this.isValidClickButton(button)) {
      this.onDrag(mouseX, mouseY, dragX, dragY)
      return true
    } else {
      return false
    }
  }

  public mouseScrolled (mouseX: number, mouseY: number, deltaY: number): boolean {
    return false
  }

  public keyPressed (key: string, code: string, action: number): boolean {
    return false
  }

  public keyReleased (key: string, code: string, action: number): boolean {
    return false
  }

  public charTyped (char: number): boolean {
    return false
  }

  public changeFocus (focus: boolean): boolean {
    if (this.active && this.visible) {
      this.focused = !this.focused
      this.onFocusedChanged(this.focused)
      return this.focused
    } else {
      return false
    }
  }

  public isMouseOver (mouseX: number, mouseY: number): boolean {
    return this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX < (this.x + this.width) && mouseY < (this.y + this.height)
  }

  protected isValidClickButton (button: number): boolean {
    return button === 0
  }

  protected clicked (mouseX: number, mouseY: number): boolean {
    return this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX < (this.x + this.width) && mouseY < (this.y + this.height)
  }

  public isHovered (): boolean {
    return this.hovered || this.focused
  }

  public setWidth (width: number): void {
    this.width = width
  }

  public setAlpha (alpha: number): void {
    this.alpha = alpha
  }

  public getWidth (): number {
    return this.height
  }

  public getHeight (): number {
    return this.height
  }

  public setMessage (component: TextComponent): void {
    this.message = component;
  }

  public getMessage (): TextComponent {
    return this.message
  }
}
