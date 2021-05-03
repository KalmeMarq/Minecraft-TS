import Registry from "../util/Registry";
import { TextComponent } from "../util/text/TextComponent";
import Util from "../util/Util";
import EffectType from "./EffectType";

export default class Effect {
  private readonly category: EffectType;
  private readonly color: number;
  private descriptionId: string | undefined;

  public constructor(category: EffectType, color: number) {
    this.category = category;
    this.color = color;
  }

  public isInstantenous(): boolean {
    return false;
  }

  protected getOrCreateDescriptionId(): string {
    if(this.descriptionId === undefined) {
      this.descriptionId = Util.makeDescriptionId("effect", Registry.MOB_EFFECT.getKey(this));
    }

    return this.descriptionId;
  }

  public getDescriptionId(): string {
    return this.getOrCreateDescriptionId();
  }

  public getDisplayName(): TextComponent {
    return new TextComponent(this.getDescriptionId());
  }
}