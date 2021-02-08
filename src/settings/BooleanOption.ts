import GameSettings from "../GameSettings.js";
import OptionButton from "../gui/widgets/button/OptionButton.js";
import Widget from "../gui/widgets/Widget.js";
import { getKeyTranslation } from "../utils/TranslationText.js";
import AbstractOption from "./AbstractOption.js";

export default class BooleanOption extends AbstractOption {
  private getter: Function;
  private setter: Function;

  constructor(translationKeyIn: string, getter: Function, setter: Function) {
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
    return new OptionButton(xIn, yIn, widthIn, 20, this, this.getName(options), ()=> {
      this.nextValue(options);
    });
  }

  public getName(options: GameSettings) {
    return getKeyTranslation(this.getBaseMessageTranslation()) + ': ' + getKeyTranslation(this.get(options) === true ? 'options.on' : 'options.off');
  }
}