
import OptionButton from '../gui/widgets/OptionButton'
import Widget from '../gui/widgets/Widget'
import IBiConsumer from '../../util/interfaces/IBiConsumer'
import IBiFunction from '../../util/interfaces/IBiFunction'
import { TextComponent } from '../../util/text/TextComponent'
import AbstractOption from './AbstractOption'
import GameSettings from './GameSettings'

export default class IteratableOption extends AbstractOption {
  private readonly setter: IBiConsumer<GameSettings, number>
  private readonly getter: IBiFunction<GameSettings, IteratableOption, TextComponent>

  constructor (translationKeyIn: string, setterIn: IBiConsumer<GameSettings, number>, getterIn: IBiFunction<GameSettings, IteratableOption, TextComponent>) {
    super(translationKeyIn)
    this.setter = setterIn
    this.getter = getterIn
  }

  public setValueIndex (options: GameSettings, valueIn: number): void {
    this.setter(options, valueIn)
    // options.saveOptions()
  }

  public createWidget (options: GameSettings, xIn: number, yIn: number, widthIn: number): Widget {
    return new OptionButton(xIn, yIn, widthIn, 20, this, this.getName(options), (button) => {
      this.setValueIndex(options, 1)
      button.setMessage(this.getName(options))
    })
  }

  public getName (settings: GameSettings): TextComponent {
    return this.getter(settings, this)
  }
}
