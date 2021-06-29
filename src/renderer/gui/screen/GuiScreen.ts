import MatrixStack from "../../util/MatrixStack";
import AbstractGui from "../AbstractGui";
import Widget from "../widgets/Widget";

export default abstract class GuiScreen extends AbstractGui {
  public width: number = 0
  public height: number = 0
  protected buttons: Widget[] = []

  public constructor() {
    super()
  }

  public initScreen(width: number, height: number): void {
    this.width = width
    this.height = height
    this.buttons = []
    this.init()
  }

  protected init(): void {
  }

  public render(matrixStack: MatrixStack, mouseX: number, mouseY: number, deltaTime: number): void {
    for(let i = 0; i < this.buttons.length; ++i) {
      this.buttons[i].render(matrixStack, mouseX, mouseY, deltaTime)
    }
  }

  public resize(width: number, height: number): void {
    this.initScreen(width, height)
  }
}