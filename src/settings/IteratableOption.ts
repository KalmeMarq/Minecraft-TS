import AbstractOption from '../AbstractOption.js';
import GameSettings from '../GameSettings.js';
import OptionButton from '../gui/widgets/button/OptionButton.js';
import { getKeyTranslation } from '../utils/TranslationText.js';

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
    return getKeyTranslation(this.text) + ': ' + getKeyTranslation(this.getter(settings).key);
  }
  
//   protected getGenericValueComponent(valueMessage: ) {
//     return new TranslationTextComponent('options.generic_value', this.getBaseMessageTranslation(), valueMessage);
//  }
}
