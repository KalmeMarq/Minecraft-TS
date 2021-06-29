import { Main } from "../..";
import MatrixStack from "../../util/MatrixStack";
import ResourceLocation from "../../util/ResourceLocation";
import AbstractGui from "../AbstractGui";

export default class Widget extends AbstractGui {
  public static readonly WIDGETS_LOCATION: ResourceLocation = new ResourceLocation("./assets/widgets.png");
  protected width: number
  protected height: number
  public x: number
  public y: number
  protected hovered: boolean = false 
  public active: boolean = true
  public visible: boolean = true
  protected alpha: number = 1.0
  private focused: boolean = false
  private message: string

  public constructor(x: number, y: number, width: number, height: number, title: string) {
    super()
    this.x = Math.round(x)
    this.y = Math.round(y)
    this.width = width
    this.height = height
    this.message = title
  }

  protected getYImage(hovered: boolean): number {
    let i = 1
    if(!this.active) i = 0
    else if (hovered) i = 2
    return i
  }

  public render(matrixStack: MatrixStack, mouseX: number, mouseY: number, deltaTime: number) {
    if(this.visible) {
      this.hovered = mouseX >= this.x &&mouseY >= this.y &&mouseX < this.x + this.width &&mouseY < this.y + this.height;
      if(this.visible) {
        this.renderButton(matrixStack, mouseX, mouseY, deltaTime)
      }
    }
  }

  public renderButton(matrixStack: MatrixStack, mouseX: number, mouseY: number, deltaTime: number): void {
    Main.bind(Widget.WIDGETS_LOCATION)
    let i = this.getYImage(this.isHovered())
    this.newBlit(matrixStack, this.x, this.y, 0, 46 + i * 20, this.width / 2, this.height)
    this.newBlit(matrixStack, this.x + this.width / 2, this.y, 200 - this.width / 2, 46 + i * 20, this.width / 2, this.height)
    this.drawText(matrixStack, this.message, this.x + this.width / 2 - this.calcWidth(this.message) / 2, this.y + (this.height - 8) / 2, 1, 1, 1)
  }

  public isHovered(): boolean {
    return this.hovered || this.focused
  }
}