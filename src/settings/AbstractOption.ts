import GameSettings from "../GameSettings";
import Widget from "../gui/widgets/Widget";
import { int } from "../utils/MouseHelper";
import { getKeyTranslation } from "../utils/TranslationText";

export default abstract class NewAbstractOption {
  private translatedBaseMessage: string;

  constructor(translationKeyIn: string) {
    this.translatedBaseMessage = translationKeyIn;
  }

  protected getBaseMessageTranslation() {
    return this.translatedBaseMessage;
 }

  public abstract createWidget(options: GameSettings, xIn: number, yIn: number, widthIn: number): Widget;

  protected getGenericValueComponent(valueMessage: string) {
    return getKeyTranslation(this.getBaseMessageTranslation()) + ': ' + getKeyTranslation(valueMessage);
  } 

  protected getPercentValueComponent(percentage: number) {
    return getKeyTranslation(this.getBaseMessageTranslation()) + `: ${int(percentage * 100)}%`;
  }

  protected getPixelValueComponent(value: number) {
    return `${getKeyTranslation(this.getBaseMessageTranslation())}: ${value}px`;
  }

  protected getPercentageAddMessage(doubleIn: number) {
    return `${getKeyTranslation(this.getBaseMessageTranslation())}: ${int(doubleIn)}`;
  }

  protected getMessageWithValue(value: number) {
    return this.getGenericValueComponent(value.toString());
  }
}