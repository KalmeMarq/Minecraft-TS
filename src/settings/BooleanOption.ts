import AbstractOption from "../AbstractOption.js";
import GameSettings from "../GameSettings.js";
import OptionButton from "../gui/widgets/button/OptionButton.js";
import Widget from "../gui/widgets/Widget.js";
import TranslationTextComponent from "../utils/TranslationText.js";

export default class BooleanOption extends AbstractOption {
  private text: string;
  public getter: any;
  private setter: any;

  constructor(translationKeyIn: string, getter: any, setter: any) {
    super();
    this.text = translationKeyIn;
    this.getter = getter;
    this.setter = setter;
  }

  public set(options: GameSettings, valueIn: boolean): void {
    this.setPriv(options, valueIn);
  }
 
  private setPriv(options: GameSettings, valueIn: boolean) {
    this.setter(options, valueIn)
  }

  public get(options: GameSettings): boolean {
    return (this.getter(options));
  }
  
  public nextValue(options: GameSettings) {
    this.set(options, !this.get(options));
  }

  public createWidget(options: GameSettings, xIn: number, yIn: number, widthIn: number): Widget {
    return new OptionButton(xIn, yIn, widthIn, 20, 0, this.func_238152_c_(options), () => {
       this.nextValue(options);
       options.saveOptions();
    });
  }

  public func_238152_c_(p_238152_1_: GameSettings) {
    return `${new TranslationTextComponent(this.text).get()}: ${this.get(p_238152_1_) == false ? new TranslationTextComponent('options.off').get() : new TranslationTextComponent('options.on').get()}`;
   }
}