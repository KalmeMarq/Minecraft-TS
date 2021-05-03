import Style from "../../util/text/Style";
import { Optional } from 'typescript-optional'

export default interface ITextProperties {
  visit<T>(acceptor: ITextAcceptor<T>): Optional<T>;
  visitStyle<T>(acceptor: IStyledTextAcceptor<T>, style: Style): Optional<T>;
  getString(): string
}

export interface IStyledTextAcceptor<T> {
  (style: Style, text: string): Optional<T>;
}

export interface ITextAcceptor<T> {
  (text: string): Optional<T>;
}