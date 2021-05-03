import BetterList from "../util/BetterList";
import Style from "../util/text/Style";
import ATextProperties from "./ATextProperties";

export default abstract class ATextComponent extends ATextProperties {
  abstract getStyle(): Style;
  abstract getContents(): string;

  public getString(): string {
    return super.getString();
  }

  abstract getSiblings(): BetterList<ATextComponent>;
}