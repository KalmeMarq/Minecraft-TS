import Style from "../../util/text/Style";
import IFormattableTextComponent from "./IFormattableTextComponent";

export default interface IBaseTextComponent {
  getStyle(): Style;
  copy(): IFormattableTextComponent;
}