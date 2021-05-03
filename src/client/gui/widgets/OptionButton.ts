import AbstractOption from '../../settings/AbstractOption'
import { TextComponent } from '../../../util/text/TextComponent'
import Button, { IPressable } from './Button'

export default class OptionButton extends Button {
  private readonly option: AbstractOption

  constructor (x: number, y: number, width: number, height: number, option: AbstractOption, title: TextComponent, onPressFunc: IPressable) {
    super(x, y, width, height, title, onPressFunc)
    this.option = option
  }

  public getOption (): AbstractOption {
    return this.option
  }

  public getTooltip () {
    return this.option.getTooltip()
  }
}