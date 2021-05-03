import IGuiEventListener from '../../../util/interfaces/IGuiEventListener'
import IRenderable from '../../../util/interfaces/IRenderable'
import IScreen from '../../../util/interfaces/IScreen'
import Minecraft from '../../Minecraft'
import Exception from '../../../util/exceptions/Exception'
import { TextComponent } from '../../../util/text/TextComponent'
import FocusableGui from '../FocusableGui'
import Widget from '../widgets/Widget'

export default abstract class Screen extends FocusableGui implements IScreen, IRenderable {
  protected mc!: Minecraft
  public title: TextComponent;
  public width = 0
  public height = 0
  protected children: IGuiEventListener[] = []
  protected buttons: Widget[] = []

  protected constructor (title: TextComponent) {
    super()
    this.title = title;
  }

  public render (mouseX: number, mouseY: number, partialTicks: number): void {
    for (let i = 0; i < this.buttons.length; i++) { this.buttons[i].render(mouseX, mouseY, partialTicks) }
  }

  public shouldCloseOnEsc (): boolean {
    return true
  }

  public onClose (): void {
    this.mc.setScreen(undefined)
  }

  public keyPressed (key: string, code: string, action: number): boolean {
    if (code === 'Escape') {
      this.onClose()
      return true
    } else {
      return super.keyPressed(key, code, action)
    }
  }

  protected addButton<T extends Widget> (widget: T): T {
    this.buttons.push(widget)
    return this.addWidget(widget)
  }

  protected addWidget<T extends IGuiEventListener> (widget: T): T {
    this.children.push(widget)
    return widget
  }

  public initScreen (mcIn: Minecraft, width: number, height: number): void {
    this.mc = mcIn
    this.width = width
    this.height = height
    this.buttons = []
    this.children = []
    this.setFocused(null)
    this.init()
  }

  public getChildren (): IGuiEventListener[] {
    return this.children
  }

  protected init (): void {
  }

  public tick (): void {
  }

  public closeScreen (): void {
  }

  public isMouseOver (mouseX: number, mouseY: number): boolean {
    return true
  }

  public resize (mcIn: Minecraft, width: number, height: number): void {
    this.initScreen(mcIn, width, height)
  }

  public static wrapScreenError(run: () => void, name: string, className: string): void {
    try {
      run();
    } catch (e) {
      throw new Exception(name + '\n' +  className);
    }
  }

  public getClassName() {
    return 'Screen'
  }
}
