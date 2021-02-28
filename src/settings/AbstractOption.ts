import Util from '@mcsrc/util/Util';
import GameSettings from '../GameSettings';
import Widget from '../gui/widgets/Widget';

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
    return Util.getTranslation(this.getBaseMessageTranslation()) + ': ' + Util.getTranslation(valueMessage);
  } 

  protected getPercentValueComponent(percentage: number) {
    return Util.getTranslation(this.getBaseMessageTranslation()) + `: ${~~(percentage * 100)}%`;
  }

  protected getPixelValueComponent(value: number) {
    return `${Util.getTranslation(this.getBaseMessageTranslation())}: ${value}px`;
  }

  protected getPercentageAddMessage(doubleIn: number) {
    return `${Util.getTranslation(this.getBaseMessageTranslation())}: ${~~(doubleIn)}`;
  }

  protected getMessageWithValue(value: number) {
    return this.getGenericValueComponent(value.toString());
  }
}