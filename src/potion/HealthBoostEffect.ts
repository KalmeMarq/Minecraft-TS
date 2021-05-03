import Effect from "./Effect";
import EffectType from "./EffectType";

export default class InstantEffect extends Effect {
  public constructor(type: EffectType, color: number) {
    super(type, color);
  }

  public isInstantenous(): boolean {
    return true;
  }
}