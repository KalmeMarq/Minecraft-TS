import Util from '@mcsrc/util/Util';
import GameSettings from '../GameSettings';
import OptionButton from '../gui/widgets/button/OptionButton';
import Widget from '../gui/widgets/Widget';
import AbstractOption from './AbstractOption';

export default class BooleanOption extends AbstractOption {
  private getter: Function;
  private setter: Function;

  constructor(translationKeyIn: string, getter: (settings: GameSettings) => boolean, setter: (settings: GameSettings, optionValues: boolean) => void) {
    super(translationKeyIn);
    this.getter = getter;
    this.setter = setter;
  }

  public set(options: GameSettings, valueIn: string) {
    this.setPriv(options, valueIn === 'true');
  }

  public nextValue(options: GameSettings) {
    this.setPriv(options, !this.get(options));
    options.saveOptions();
  }

  private setPriv(options: GameSettings, valueIn: boolean) {
    this.setter(options, valueIn);
  }

  public get(options: GameSettings) {
    return this.getter(options);
  }

  public createWidget(options: GameSettings, xIn: number, yIn: number, widthIn: number): Widget {
    return new OptionButton(xIn, yIn, widthIn, 20, this, this.getName(options), (button) => {
      this.nextValue(options);
      console.log(this.getName(options));
      button.setMessage(this.getName(options));
    });
  }

  public getName(options: GameSettings) {
    return Util.getTranslation(this.getBaseMessageTranslation()) + ': ' + Util.getTranslation(this.get(options) === true ? 'options.on' : 'options.off');
  }
}