import BetterList from "../../util/BetterList";
import Style from "../../util/text/Style";
import { IStyledTextAcceptor, ITextAcceptor } from "../ATextProperties";
import TextComponent from "./TextComponent";
import TextProperties from "./TextProperties";
import { Optional } from 'typescript-optional'
import Util from "../../util/Util";

export default class TranslationTextComponent extends TextComponent {
  private static readonly NO_ARGS: Object[] = [];
  private static readonly TEXT_PERCENT: TextProperties = TextProperties.of("%");
  private static readonly TEXT_NULL: TextProperties = TextProperties.of("null");
  private readonly key: string;
  private readonly args: Object[];
  private readonly decomposedParts: BetterList<TextProperties> = new BetterList();
  private static FORMAT_PATTERN: RegExp = /%(?:(\d+)\$)?([A-Za-z%]|$)/g

  public constructor(key: string, ...args: Object[]) {
    super();
    this.key = key;
    this.args = args.length === 0 ? TranslationTextComponent.NO_ARGS : args;
  }

  public plainCopy(): TranslationTextComponent {
    return new TranslationTextComponent(this.key, this.args);
  }

  public visitSelf<T>(acceptor: ITextAcceptor<T>): Optional<T> {
    for(const itextproperties of this.decomposedParts as BetterList<TextProperties>) {
      let optional: Optional<T> = itextproperties.visit(acceptor);
      if (optional.isPresent()) {
        return optional;
      }
    }

    return Optional.empty();
  }

  public visitSelfStyle<T>(acceptor: IStyledTextAcceptor<T>, vstyle: Style): Optional<T> {
    for(const itextproperties of this.decomposedParts as BetterList<TextProperties>) {
      let optional: Optional<T> = itextproperties.visitStyle(acceptor, vstyle);
      if(optional.isPresent()) {
        return optional;
      }
    }

    return Optional.empty();
  }

  public equals(compareTo: Object): boolean {
    if (this === compareTo) {
      return true;
    } else if (!(compareTo instanceof TranslationTextComponent)) {
      return false;
    } else {
      let translationtextcomponent: TranslationTextComponent = compareTo as TranslationTextComponent;

      let is = true;
      for(let i = 0; i < this.args.length; i++) {
        if(this.args[i] !== translationtextcomponent.args[i]) {
          is = false;
          break;
        }
      }

      return is && Util.equals(this.key, translationtextcomponent.key) && super.equals(compareTo);
    }
  }

  public getKey(): string {
    return this.key;
  }

  public getArgs(): Object[] {
    return this.args;
  }
}