import Style from "../../util/text/Style";
import IBaseTextComponent from "./IBaseTextComponent";
import ITextComponent from "./ITextComponent";
import { Optional } from 'typescript-optional'
import { IStyledTextAcceptor, ITextAcceptor } from "./ITextProperties";
import TextProperties from "./TextProperties";
import BetterList from "../../util/BetterList";
import IFormattableTextComponent from "./IFormattableTextComponent";
import TextComponent from "./TextComponent";
import FormattableTextComponent from "./FormattableTextComponent";

export default abstract class BaseTextComponent extends TextProperties implements IBaseTextComponent {
  abstract getStyle(): Style;
  abstract getContents(): string;
  getString(): string {
    return super.getString();
  }

  abstract getSiblings(): BetterList<ITextComponent>;
  abstract plainCopy(): FormattableTextComponent;
  abstract copy(): FormattableTextComponent;

  visitStyle<T>(acceptor: IStyledTextAcceptor<T>, vstyle: Style): Optional<T> {
    let style: Style = this.getStyle().applyTo(vstyle);
    let optional: Optional<T> = this.visitSelfStyle(acceptor, style);
    if(optional.isPresent()) {
      return optional;
    } else {
      for(const itextcomponent of this.getSiblings() as BetterList<TextComponent>) {
        let optional1: Optional<T> = itextcomponent.visitStyle(acceptor, style);
        if (optional1.isPresent()) {
            return optional1;
        }
      }

      return Optional.empty();
    }
  }

  visit<T>(acceptor: ITextAcceptor<T>): Optional<T> {
    let optional: Optional<T> = this.visitSelf(acceptor);
    if (optional.isPresent()) {
       return optional;
    } else {
      for(const itextcomponent of this.getSiblings() as BetterList<TextComponent>) {
        let optional1: Optional<T> = itextcomponent.visit(acceptor);
        if (optional1.isPresent()) {
          return optional1;
        }
      }

      return Optional.empty();
    }
  }

  visitSelf<T>(acceptor:ITextAcceptor<T>): Optional<T> {
    return acceptor(this.getContents());
  }

  visitSelfStyle<T>(acceptor: IStyledTextAcceptor<T>, style: Style): Optional<T> {
    return acceptor(style, this.getContents());
  }
} 