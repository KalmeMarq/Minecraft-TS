import { Optional } from 'typescript-optional'
import Style from '../util/text/Style';
import StringBuilder from '../util/useless/StringBuilder';

export default abstract class ATextProperties {
  public static EMPTY: ATextProperties = new class extends ATextProperties {
    public visit<T>(acceptor: ITextAcceptor<T>): Optional<T> {
      return Optional.empty();
    }

    public visitWithStyle<T>(acceptor: IStyledTextAcceptor<T>, style: Style): Optional<T> {
      return Optional.empty();
    }
  };

  public static of(text: string, style?: Style) {
    return new class extends ATextProperties {
      public visit<T>(acceptor: ITextAcceptor<T>): Optional<T> {
         return acceptor(text);
      }

      public visitWithStyle<T>(acceptor: IStyledTextAcceptor<T>, style: Style): Optional<T> {
        return acceptor(style === undefined ? style : style.applyTo(style), text);
      }
    }
  }

  abstract visit<T>(acceptor: ITextAcceptor<T>): Optional<T>;
  abstract visitWithStyle<T>(acceptor: IStyledTextAcceptor<T>, style: Style): Optional<T>;

  public getString(): string {
    let stringbuilder: StringBuilder = new StringBuilder();
    this.visit((p_241754_1_) => {
      stringbuilder.append(p_241754_1_);
      return Optional.empty();
    });
    return stringbuilder.toString();
  }
}

export interface IStyledTextAcceptor<T> {
  (style: Style, text: string): Optional<T>;
}

export interface ITextAcceptor<T> {
  (text: string): Optional<T>;
}