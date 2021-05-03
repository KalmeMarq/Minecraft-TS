import Style from "../../util/text/Style";
import TextFormatting from "../../util/text/TextFormatting";
import IBaseTextComponent from "./IBaseTextComponent";

export default interface IFormattableTextComponent extends IBaseTextComponent {
  setStyle(style: Style): IFormattableTextComponent;
  append(text: string | any): IFormattableTextComponent;
  withStyle(style: Style | TextFormatting | TextFormatting[]): IFormattableTextComponent;
}