import TranslationTextComponent from "../../test/text/TranslationTextComponent";
import Util from "../Util";
import Exception from "./Exception";

export default class TranslationTextComponentFormatException extends Exception {
  public constructor(message: TranslationTextComponent, text: string | number) {
    super(Util.format(typeof text === 'string' ? "Error parsing: %s: %s" : "Invalid index %d requested for %s", message.toString(), text), 'TranslationTextComponentFormatException', TranslationTextComponentFormatException);
  }
}