import ResourceLocation from '../../resources/ResourceLocation'
import { TextComponent } from '../../util/text/TextComponent'
import Widget from './Widget'

export default class Button extends Widget {
  public static WIDGETS_LOCATION: ResourceLocation = new ResourceLocation('textures/gui/widgets.png')
  public static NO_TOOLTIP: ITooltip = (button: Button, mouseX: number, mouseY: number) => {}
  protected onPress: IPressable
  protected onTooltip: ITooltip

  public constructor (x: number, y: number, width: number, height: number, title: TextComponent, onPress: IPressable, onTooltip?: ITooltip) {
    super(x, y, width, height, title)
    this.onPress = onPress
    this.onTooltip = onTooltip ?? Button.NO_TOOLTIP
  }

  public onClick (mouseX: number, mouseY: number): void {
    this.onPress(this)
  }

  public keyPressed (key: string, code: string, action: number): boolean {
    if (this.active && this.visible) {
      if (code === 'Enter' || code === 'NumpadEnter' || code === 'Space') {
        this.onPress(this)
        return true
      } else return false
    } else return false
  }
}

export type IPressable = (button: Button) => void
export type ITooltip = (button: Button, mouseX: number, mouseY: number) => void
