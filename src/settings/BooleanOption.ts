import AbstractOption from "../AbstractOption.js";
import GameSettings from "../GameSettings.js";
import OptionButton from "../gui/widgets/button/OptionButton.js";
import Widget from "../gui/widgets/Widget.js";
import TranslationTextComponent from "../utils/TranslationText.js";

export class BooleanOption extends AbstractOption {
  private field_244785_aa: string;
  public getter: string;
  private setter: boolean;

  constructor(translationKeyIn: string, getter: string, setter: boolean) {
    super()
    this.field_244785_aa = translationKeyIn;
    this.getter = getter;
    this.setter = setter;
  }

  public set(options: GameSettings, valueIn: string): void {
    this.setPriv(options, (valueIn == 'true' ? true : false));
  }
 
  private setPriv(options: GameSettings, valueIn: boolean) {
    const i: string = this.getter;
    options.accept(i, valueIn);
  }

  public get(options: GameSettings): boolean {
    const i: string = this.getter;
    return options.test(i);
 }
  
  public nextValue(options: GameSettings) {
    this.set(options, String(!this.get(options)));
  }

  public createWidget(options: GameSettings, xIn: number, yIn: number, widthIn: number): Widget {
   /*  if (this.field_244785_aa != null) {
       this.setOptionValues(Minecraft.getInstance().fontRenderer.trimStringToWidth(this.field_244785_aa, 200));
    } */

    return new OptionButton(xIn, yIn, widthIn, 20, this, this.func_238152_c_(options), () => {
       this.nextValue(options);
       console.log("sss");
       
    });
  }

  public func_238152_c_(p_238152_1_: GameSettings) {
    return `${this.field_244785_aa}: ${this.get(p_238152_1_) == false ? new TranslationTextComponent('options.off').get() : new TranslationTextComponent('options.on').get()}`;
   }
}