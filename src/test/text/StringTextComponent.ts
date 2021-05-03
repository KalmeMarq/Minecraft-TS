import BetterList from "../../util/BetterList";
import Style from "../../util/text/Style";
import Util from "../../util/Util";
import BaseTextComponent from "./BaseTextComponent";
import IBaseTextComponent from "./IBaseTextComponent";
import IFormattableTextComponent from "./IFormattableTextComponent";
import ITextComponent from "./ITextComponent";
import TextComponent from "./TextComponent";

export default class StringTextComponent extends TextComponent {
  public static readonly EMPTY: BaseTextComponent = new StringTextComponent('');
  private readonly text: string;

  public constructor(text: string) {
    super();
    this.text = text;
  }

  public getText(): string {
    return this.text;
  }

  public getContents(): string {
    return this.text;
  }

  public plainCopy(): StringTextComponent {
    return new StringTextComponent(this.text);
  }

  public equals(compareTo: Object): boolean {
    if (this === compareTo) {
      return true;
    } else if (!(compareTo instanceof StringTextComponent)) {
      return false;
    } else {
      let stringtextcomponent: StringTextComponent = compareTo as StringTextComponent;
      return Util.equals(this.text, stringtextcomponent.getText()) && super.equals(compareTo);
    }
  }

  public toString(): string {
    return "TextComponent{text='" + this.text + '\'' + ", siblings=" + this.siblings + ", style=" + this.getStyle() + '}';
  }
}