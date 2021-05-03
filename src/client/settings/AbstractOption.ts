import Widget from "../gui/widgets/Widget"
import { TextComponent } from "../../util/text/TextComponent"
import GameSettings from "./GameSettings"

export default abstract class AbstractOption {
  private readonly translatedBaseMessage: string

  constructor (translationKeyIn: string) {
    this.translatedBaseMessage = translationKeyIn
  }

  protected getBaseMessageTranslation () {
    return this.translatedBaseMessage
  }

  private toolTip: any = null

  public setTooltip (p_241567_1_: any) {
    this.toolTip = p_241567_1_ || null
  }

  public getTooltip () {
    return this.toolTip
  }

  public abstract createWidget (options: GameSettings, xIn: number, yIn: number, widthIn: number): Widget

  protected getGenericValueComponent (valueMessage: string) {
    return new TextComponent(this.getBaseMessageTranslation()).append(new TextComponent(': ')).append(new TextComponent(valueMessage))
  }

  protected getPercentValueComponent (percentage: number) {
    return new TextComponent(this.getBaseMessageTranslation()).append(new TextComponent(': ')).append(new TextComponent(~~(percentage * 100) + '%'))
  }

  protected getPixelValueComponent (value: number) {
    return new TextComponent(this.getBaseMessageTranslation()).append(new TextComponent(': ')).append(new TextComponent(value + 'px'))
  }

  protected getPercentageAddMessage (doubleIn: number) {
    return new TextComponent(this.getBaseMessageTranslation()).append(new TextComponent(': ')).append(new TextComponent((~~(doubleIn)) + ''))
  }

  protected getMessageWithValue (value: number) {
    return this.getGenericValueComponent(value + '')
  }
}