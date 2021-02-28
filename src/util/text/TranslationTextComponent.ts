import Util from "../Util";
import TextComponent from "./TextComponent";

export default class TranslationTextComponent extends TextComponent {
  private key: string;
  
  constructor(translationKey: string) {
    super();
    this.key = translationKey;
  }

  public getTranslatedKey() {
    return Util.getTranslation(this.key);
  }

  public getKey(): string {
		return this.key;
	}
}