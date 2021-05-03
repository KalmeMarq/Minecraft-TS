import Effect from "./Effect";
import EffectType from "./EffectType";

export default class AbsorptionEffect extends Effect {
  public constructor(type: EffectType, color: number) {
    super(type, color);
  }
}