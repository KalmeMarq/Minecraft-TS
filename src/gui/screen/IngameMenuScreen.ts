import GuiScreen from './GuiScreen'

export default class IngameMenuScreen extends GuiScreen {
  private readonly isFullMenu: boolean

  constructor(isFullMenu: boolean) {
    super()
    this.isFullMenu = isFullMenu
  }

  protected init(): void {
    if(this.isFullMenu) this.addButtons()
  }

  private addButtons(): void {}

  public tick(): void {
    super.tick()
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    if(this.isFullMenu) {}

    super.render(context, mouseX, mouseY, partialTicks);
  }
}