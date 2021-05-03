import Effect from "./Effect";
import EffectType from "./EffectType";

export default class AttackDamageEffect extends Effect {
  protected readonly multiplier: number;
  public constructor(type: EffectType, color: number, multiplier: number) {
    super(type, color);
    this.multiplier = multiplier;
  }
}