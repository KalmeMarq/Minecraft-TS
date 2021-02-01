import AbstractOption from '../AbstractOption';
import GameSettings from '../GameSettings';
import OptionButton from '../gui/widgets/button/OptionButton';
import TranslationTextComponent from '../utils/TranslationText';

export default class IteratableOption extends AbstractOption {
  private text: string;
  private setter;
  private getter;

  constructor(translationKeyIn: string, getterIn: any,  setterIn: any) {
    super();
    this.text = translationKeyIn;
    this.setter = setterIn;
    this.getter = getterIn;
  }

   public setValueIndex(options: GameSettings, valueIn: number) {
    this.setter(options, valueIn);
    options.saveOptions();
  }

  public createWidget(options: GameSettings, xIn: number, yIn: number, widthIn: number) {
    return new OptionButton(xIn, yIn, widthIn, 20, this, this.getName(options), () => {
      this.setValueIndex(options, 1);
    });
  }

  public get(options: GameSettings): boolean {
    return (this.getter(options));
  }

  public getName(settings: GameSettings) {
    return new TranslationTextComponent(this.text).get() + ': ' + new TranslationTextComponent(this.getter(settings).key).get();
  }
  
//   protected getGenericValueComponent(valueMessage: ) {
//     return new TranslationTextComponent('options.generic_value', this.getBaseMessageTranslation(), valueMessage);
//  }
}
