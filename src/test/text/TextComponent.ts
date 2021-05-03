import BetterList from "../../util/BetterList";
import Style from "../../util/text/Style";
import TextProperties from "./TextProperties";
import ITextComponent from "./ITextComponent";
import FormattableTextComponent from "./FormattableTextComponent";
import IFormattableTextComponent from "./IFormattableTextComponent";
import BaseTextComponent from "./BaseTextComponent";

export default abstract class TextComponent extends FormattableTextComponent implements ITextComponent {
  protected readonly siblings: BetterList<any> = new BetterList();
  private style: Style = Style.EMPTY;

  public append(component: TextComponent): FormattableTextComponent {
    this.siblings.add(component);
    return this;
  }

  public getContents(): string {
    return "";
  }

  public getSiblings(): BetterList<ITextComponent> {
    return this.siblings;
  }

  public setStyle(style: Style): IFormattableTextComponent {
    this.style = style;
    return this;
  }

  public getStyle(): Style {
    return this.style;
  }

  public abstract plainCopy(): TextComponent;

  public copy(): FormattableTextComponent {
    let textcomponent: TextComponent = this.plainCopy();
    textcomponent.siblings.addAll(this.siblings);
    textcomponent.setStyle(this.style);
    return textcomponent;
  }

  public equals(compareTo: Object): boolean {
    if(this === compareTo) {
      return true;
    } else if(!(compareTo instanceof TextComponent)) {
      return false;
    } else {
      let textcomponent: TextComponent = compareTo as TextComponent;
      return this.siblings.equals(textcomponent.siblings) && this.getStyle().equals(textcomponent.getStyle());
    }
  }

  public toString(): string {
    return "BaseComponent{style=" + this.style + ", siblings=" + this.siblings + '}';
  }
}