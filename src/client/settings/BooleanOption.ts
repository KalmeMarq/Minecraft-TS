
import OptionButton from '../gui/widgets/OptionButton'
import Widget from '../gui/widgets/Widget'
import IBiConsumer from '../../util/interfaces/IBiConsumer'
import IFunction from '../../util/interfaces/IFunction'
import { TextComponent } from '../../util/text/TextComponent'
import AbstractOption from './AbstractOption'
import GameSettings from './GameSettings'

export default class BooleanOption extends AbstractOption {
  private readonly getter: IFunction<GameSettings, boolean>
  private readonly setter: IBiConsumer<GameSettings, boolean>

  constructor (translationKeyIn: string, getter: IFunction<GameSettings, boolean>, setter: IBiConsumer<GameSettings, boolean>) {
    super(translationKeyIn)
    this.getter = getter
    this.setter = setter
  }

  public set (options: GameSettings, valueIn: string) {
    this.setPriv(options, valueIn === 'true')
  }

  public nextValue (options: GameSettings) {
    this.setPriv(options, !this.get(options))
    // options.save()
  }

  private setPriv (options: GameSettings, valueIn: boolean): void {
    this.setter(options, valueIn)
  }

  public get (options: GameSettings): boolean {
    return this.getter(options)
  }

  public createWidget (options: GameSettings, xIn: number, yIn: number, widthIn: number): Widget {
    return new OptionButton(xIn, yIn, widthIn, 20, this, this.getName(options), (button) => {
      this.nextValue(options)
      console.log(this.getName(options))
      button.setMessage(this.getName(options))
    })
  }

  public getName (options: GameSettings) {
    return new TextComponent(this.getBaseMessageTranslation()).append(new TextComponent(': ')).append(new TextComponent(this.get(options) ? 'options.on' : 'options.off'))
  }
}
