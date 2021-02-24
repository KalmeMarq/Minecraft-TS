import TextComponent from "./TextComponent";

export default class TranslationTextComponent extends TextComponent {
  private static formatArguments: {}[] = new Array(0);
  private formatArgs: {}[];
  private key: string;

  constructor(translationKey: string, args = TranslationTextComponent.formatArguments) {
    super();
		this.key = translationKey;
		this.formatArgs = args;
	}

  public toString(): string {
		return `TranslatableComponent{key="${this.key}", args=${this.formatArgs.toString()}, siblings=${this.siblings}}`;
	}

  public getKey(): string {
		return this.key;
	}

  public getFormatArgs(): {}[] {
		return this.formatArgs;
	}
}