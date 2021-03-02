// import SimpleSound from '@mcsrc/audio/SimpleSound'
// import SoundHandler from '@mcsrc/audio/SoundHandler'
// import SoundEvents from '@mcsrc/util/SoundEvents'
import Sounds from '@mcsrc/audio/Sound'
import NarratorChatListener from '@mcsrc/new/NarratorChatListener'
import ResourceLocation from '@mcsrc/new/ResourceLocation'
import NarratorStatus from '@mcsrc/settings/NarratorStatus'
import SoundCategory from '@mcsrc/util/SoundCategory'
import TranslationTextComponent from '@mcsrc/util/text/TranslationTextComponent'
import Util from '@mcsrc/util/Util'
import IGuiEventListener from '../../interface/IGuiEventListener'
import IRenderable from '../../interface/IRenderable'
import Minecraft from '../../Minecraft'
import AbstractGui from '../AbstractGui'
import FontRenderer from '../FontRenderer'

export default class Widget extends AbstractGui implements IRenderable, IGuiEventListener {
  public static WIDGETS_LOCATION: ResourceLocation = new ResourceLocation('textures/gui/widgets.png');
  protected width: number
  protected height: number
  public x: number
  public y: number
  private message: string | TranslationTextComponent
  private wasHovered: boolean = false
  protected isHovered: boolean = false
  public active: boolean = true
  public visible: boolean = true
  protected alpha: number = 1.0
  private focused: boolean = false

  constructor(x: number, y: number, width: number, height: number, title: string | TranslationTextComponent) {
    super()
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.message = title
  }

  public render(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    if(this.visible) {
      this.isHovered = mouseX >= this.x && mouseY >= this.y && mouseX < this.x + this.width && mouseY < this.y + this.height

      if(this.visible) {
        this.renderButton(context, mouseX, mouseY, partialTicks);
      }

      this.narrate();
      this.wasHovered = this.getIsHovered();
    }
  }

  protected narrate(): void {
    if(this.active && this.getIsHovered()) {
      let s = this.getNarrationMessage();
      if(!s.isEmpty()) {
        NarratorChatListener.INSTANCE.say(s);
      }
    }
  }

  protected getNarrationMessage() {
    let msg: string;
    if(this.message instanceof TranslationTextComponent) {
      msg = this.message.getTranslatedKey();
    } else {
      msg = this.message;
    }

    return msg;
  }

  public renderButton(context: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number): void {
    const minecraft: Minecraft = Minecraft.getInstance();
    const fontrenderer: FontRenderer  = minecraft.fontRenderer;
    const widgetsTexture = minecraft.getTextureManager().getTexture(Widget.WIDGETS_LOCATION);
    let yUV = this.getYImage(this.getIsHovered());
    context.globalAlpha = this.alpha;
    AbstractGui.blit(context, widgetsTexture, this.x, this.y, 0, 46 + yUV * 20, this.width / 2, this.height);
    AbstractGui.blit(context, widgetsTexture, this.x + this.width / 2, this.y, 200 - this.width / 2, 46 + yUV * 20, this.width / 2, this.height);
    this.renderBg(context, minecraft, mouseX, mouseY);
    let textColor = this.active ? 16777215 : 10526880;
    this.drawCenteredString(context, fontrenderer, this.getMessage(), this.x + this.width / 2, this.y + (this.height - 8) / 2, textColor);
    context.globalAlpha = 1;
  }

  protected getYImage(isHovered: boolean): number {
    if(!this.active) return 0;
    else if(isHovered) return 2;
    return 1;
  }

  protected renderBg(context: CanvasRenderingContext2D, minecraft: Minecraft, mouseX: number, mouseY: number): void {
  }

  public onClick(mouseX: number, mouseY: number): void {
  }

  public onRelease(mouseX: number, mouseY: number): void {
  }

  protected onDrag(mouseX: number, mouseY: number, dragX: number, dragY: number): void {
  }

  public mouseMoved(mouseX: number, mouseY: number): boolean {
    return false
  }

  public mouseClicked(mouseX: number, mouseY: number, button: number): boolean {
    if(this.active && this.visible) {
      if(this.isValidClickButton(button)) {
        let flag = this.clicked(mouseX, mouseY);
        if(flag) {
          this.playDownSound(Minecraft.getInstance().getSoundHandler());
          this.onClick(mouseX, mouseY)
          return true
        }
      }
      return false
    } else return false
  }

  public playDownSound(handler: any) {
    handler.play(Sounds.clickStereo, SoundCategory.MASTER, 0.5);
  }

  public mouseReleased(mouseX: number, mouseY: number, button: number): boolean {
    if(this.isValidClickButton(button)) {
      this.onRelease(mouseX, mouseY)
      return true
    } else return false
  }

  public mouseDragged(mouseX: number, mouseY: number, button: number, dragX: number, dragY: number): boolean {
    if(this.isValidClickButton(button)) {
      this.onDrag(mouseX, mouseY, dragX, dragY)
      return true
    } else return false
  }

  public mouseScrolled(mouseX: number, mouseY: number, delta: number): boolean {
    return false
  }

  public keyPressed(key: string, modifiers: any): boolean {
    return false
  }

  public keyReleased(key: string, modifiers: any): boolean {
    return false
  }

  public changeFocus(focus: boolean): boolean {
    if(this.active && this.visible) {
      this.focused = !this.focused
      this.onFocusedChanged(this.focused)
      return this.focused
    } else return false
  }

  protected onFocusedChanged(focused: boolean): void {}

  public isMouseOver = (mouseX: number, mouseY: number): boolean =>
    this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX < (this.x + this.width) && mouseY < (this.y + this.height)

  public getWidth = (): number => this.width

  public setWidth(width: number): void {
    this.width = width
  }

  public setAlpha(alpha: number): void {
    this.alpha = alpha
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getMessage = (): string | TranslationTextComponent => this.message

  public isFocused = (): boolean => this.focused

  protected setFocused(focused: boolean) {
    this.focused = focused;
  }
  
  public getIsHovered(): boolean {
    return this.isHovered || this.focused
  }

  protected isValidClickButton = (button: number): boolean => button === 0

  protected clicked = (mouseX: number, mouseY: number): boolean =>
    this.active && this.visible && mouseX >= this.x && mouseY >= this.y && mouseX < (this.x + this.width) && mouseY < (this.y + this.height);
}