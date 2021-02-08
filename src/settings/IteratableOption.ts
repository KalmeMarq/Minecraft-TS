import GameSettings from '../GameSettings.js';
import OptionButton from '../gui/widgets/button/OptionButton.js';
import Widgets from '../gui/widgets/Widget.js';
import AbstractOption from './AbstractOption.js';

export default class NewIteratableOption extends AbstractOption {
  private setter: Function;
  private getter: Function;

  constructor(translationKeyIn: string, setterIn: Function, getterIn: Function) {
    super(translationKeyIn);
    this.setter = setterIn;
    this.getter = getterIn;
  }

  public setValueIndex(options: GameSettings, valueIn: number) {
    this.setter(options, valueIn);
    options.saveOptions();
  }

  public createWidget(options: GameSettings, xIn: number, yIn: number, widthIn: number): Widgets {
    return new OptionButton(xIn, yIn, widthIn, 20, this, this.getName(options), () => {
      this.setValueIndex(options, 1);
    });
  }

  public getName(settings: GameSettings) {
    return this.getter(settings, this);
  }
}