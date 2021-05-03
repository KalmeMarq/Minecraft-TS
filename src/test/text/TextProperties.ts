import Style from "../../util/text/Style";
import StringBuilder from "../../util/useless/StringBuilder";
import ITextProperties, { IStyledTextAcceptor, ITextAcceptor } from "./ITextProperties";
import { Optional } from 'typescript-optional'

export default abstract class TextProperties implements ITextProperties {
  static EMPTY: ITextProperties = new class extends TextProperties {
    public visit<T>(acceptor: ITextAcceptor<T>): Optional<T> {
      return Optional.empty();
    }

    public visitStyle<T>(acceptor: IStyledTextAcceptor<T>, style: Style): Optional<T> {
      return Optional.empty();
    }
  }

  static of(text: string, style?: Style) {
    return new class extends TextProperties {
      public visit<T>(acceptor: ITextAcceptor<T>): Optional<T> {
        return acceptor(text);
      }

      public visitStyle<T>(acceptor: IStyledTextAcceptor<T>, vstyle: Style): Optional<T> {
        return acceptor(style === undefined ? vstyle : style.applyTo(vstyle), text);
      }
    }
  }

  abstract visit<T>(acceptor: ITextAcceptor<T>): Optional<T>;
  abstract visitStyle<T>(acceptor: IStyledTextAcceptor<T>, style: Style): Optional<T>;

  getString(): string {
    let stringbuilder: StringBuilder = new StringBuilder();
    this.visit((text: string) => {
      stringbuilder.append(text);
      return Optional.empty();
    });
    return stringbuilder.toString();
  }
}