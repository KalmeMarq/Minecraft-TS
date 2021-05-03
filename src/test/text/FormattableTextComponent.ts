import Style from "../../util/text/Style";
import TextFormatting from "../../util/text/TextFormatting";
import BaseTextComponent from "./BaseTextComponent";
import IFormattableTextComponent from "./IFormattableTextComponent";

export default abstract class FormattableTextComponent extends BaseTextComponent implements IFormattableTextComponent {
  abstract setStyle(style: Style): IFormattableTextComponent;
  abstract append(text: any): IFormattableTextComponent;

  withStyle(style: Style | TextFormatting | TextFormatting[]): IFormattableTextComponent {
    if(style instanceof Style) {
      this.setStyle(style.applyTo(this.getStyle()));
      return this;
    } else if(style instanceof TextFormatting) {
      this.setStyle(this.getStyle().applyFormat(style));
      return this;
    } else {
      this.setStyle(this.getStyle().applyFormats(...style));
      return this;
    }
  }
} 