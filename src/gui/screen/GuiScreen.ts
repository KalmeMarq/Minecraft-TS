import IGuiEventListener from '@mcsrc/interface/IGuiEventListener'
import IGuiScreen from '@mcsrc/interface/IGuiScreen'
import Minecraft from '@mcsrc/Minecraft'
import FocusableGui from '@mcsrc/gui/FocusableGui'
import Widget from '@mcsrc/gui/widgets/Widget'
import FontRenderer from '@mcsrc/gui/FontRenderer'
import ContextUtils from '@mcsrc/util/ContextUtils'
import AbstractOption from '@mcsrc/settings/AbstractOption'
import AbstractGui from '../AbstractGui'

export default class GuiScreen extends FocusableGui implements IGuiScreen, IGuiEventListener {
  protected readonly title: string = '';
  protected children: Array<IGuiEventListener> = new Array();
  public minecraft!: Minecraft;
  public width: number = 0;
  public height: number = 0;
  protected buttons: Array<Widget> = new Array();
  public passEvents: boolean = false;
  protected font!: FontRenderer;
  private clickedLink!: string;

  constructor(...params: any[]) {
    super()
    if(params.length > 0) this.title = params[0]
  }

  public getTitle (): string {
    return this.title ? this.title : ''
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    for(let i = 0; i < this.buttons.length; ++i) this.buttons[i].render(context, mouseX, mouseY, partialTicks);

    if(this.minecraft.gameSettings.showFPS) {
      context.setTransform(2, 0, 0, 2, 0, 0);
      this.drawString(context, this.font, this.minecraft.getFPS().toString() + ' FPS', 1, 1, 16777215);
      context.setTransform(this.minecraft.getMainCanvas().getGuiScaleFactor(), 0, 0, this.minecraft.getMainCanvas().getGuiScaleFactor(), 0, 0);
    }
  }

  public shouldCloseOnEsc (): boolean {
    return true
  }

  public closeScreen(): void {
    this.minecraft.displayGuiScreen(null)
  }

  protected addButton<T extends Widget>(button: T): T {
    this.buttons.push(button)
    return this.addListener(button)
  }

  protected addListener<T extends IGuiEventListener>(listener: T): T {
    this.children.push(listener)
    return listener
  }

  public keyPressed(key: string, modifiers: any): boolean {
    if (key == 'Escape' && this.shouldCloseOnEsc()) {
      this.closeScreen()
      return true
    } else if(key == 'Tab') {
      if(!this.changeFocus(true)) this.changeFocus(false)
      return false
    } else {
      return super.keyPressed(key, modifiers)
    }
  }

  public initScreen(minecraft: Minecraft, width: number, height: number) {
    this.minecraft = minecraft;
    this.font = minecraft.fontRenderer;
    this.width = width;
    this.height = height;
    this.buttons = [];
    this.children = [];
    this.setListener(null);
    this.init();
  }

  public getEventListeners(): Array<IGuiEventListener> {
    return this.children
  }

  protected init(): void {}

  public tick(): void {}

  public onClose(): void {}

  public isPauseScreen (): boolean {
    return true
  }

  public resize(minecraft: Minecraft, width: number, height: number): void {
    this.initScreen(minecraft, width, height);
  }

  public static wrapScreenError(action: Function, errorDesc: string, screenName: string) {
    try {
      action();
    } catch (e) {
      let error = `
        Failed to run action
        Screen name: ${screenName}
        ${errorDesc}

        More Details:
          ${e}
      `;
      throw error;
    }
  }

  public isMouseOver(mouseX: number, mouseY: number): boolean {
    return true;
  }

  public renderBackground(context: CanvasRenderingContext2D, vOffset?: number) {
    if(vOffset) {
      if(this.minecraft.world != null) {
      
      } else {
        this.renderDirtBackground(context, vOffset);
      }
    } else {
      this.renderDirtBackground(context, 0);
    }
  }

  public renderDirtBackground(context: CanvasRenderingContext2D,vOffset: number): void {
    const optionsBgTexture = this.minecraft.getTextureManager().getTexture(AbstractGui.BACKGROUND_LOCATION);

    if(!this.minecraft.textureBuffer.has('options_bg_0')) {
      this.minecraft.textureBuffer.add('options_bg_0', AbstractGui.createBuffer(16, 16, (ctx) => {
        ctx.filter = 'brightness(25%)';
        AbstractGui.blit(ctx, optionsBgTexture, 0, 0, 0, 0, 16, 16);
      }))
    } else {
      const src = this.minecraft.textureBuffer.get('options_bg_0');

      context.setTransform(this.minecraft.getMainCanvas().getGuiScaleFactor() + 3 - (3 - this.minecraft.getMainCanvas().getGuiScaleFactor()), 0, 0, this.minecraft.getMainCanvas().getGuiScaleFactor() + 3 - (3 - this.minecraft.getMainCanvas().getGuiScaleFactor()), 0, 0);
      ContextUtils.createTilePattern(context, src, this.width / 32, this.height / 32, 0, 0, 16, 16, 0, vOffset)
      context.setTransform(this.minecraft.getMainCanvas().getGuiScaleFactor(), 0, 0, this.minecraft.getMainCanvas().getGuiScaleFactor(), 0, 0);
    }
  }

  public tempAddOptions(options: AbstractOption[]) {
    let index = 0;
    for (const iterator of options) {
      let x = this.width / 2 - 155 + (index % 2) * 160;
      let y = this.height / 6 - 12 + 24 * (index >> 1);
      this.addButton((iterator as AbstractOption).createWidget(this.minecraft.gameSettings, x, y, 150));
      index++;
    }
  }

  public getClassName() {
    return this.constructor.name;
  }
}